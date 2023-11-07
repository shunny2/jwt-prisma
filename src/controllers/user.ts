import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

import bcrypt from 'bcrypt';

import { validateEmail, validatePassword, validateUser } from '../helpers';
import { BadRequestError } from '../helpers/api-errors';
import { emailToken } from '../utils/email-token';
import { template } from '../utils/template';
import { IMessage } from '../interfaces/email';
import { sendEmail } from '../services/email/send-email';
import { resendEmail } from '../services/email/resend-email';

export const count = async (_: any, res: Response) => {
    const count = await prisma.user.count();

    return res.json({ count });
};

export const search = async (req: Request, res: Response) => {
    const { search, take, skip } = req.query;

    const users = await prisma.user.findMany({
        take: take != undefined ? Number(take) : 10,
        skip: skip != undefined ? Number(skip) : undefined,
        where: {
            name: {
                contains: String(search),
            }
        }
    });

    // Remove the password field from each user object
    const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });

    return res.json({ users: usersWithoutPasswords });
};

export const create = async (req: Request, res: Response) => {
    const { error, value } = validateUser(req.body);

    if (error)
        return res.status(400).json({ message: error?.message });

    const userExists = await prisma.user.findUnique({
        where: {
            email: value.email
        }
    });

    if (userExists)
        throw new BadRequestError('This User already exists!');

    // Encrypting user password.
    const hashPassword = await bcrypt.hash(value.password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: value.name,
            email: value.email,
            password: hashPassword
        }
    });

    const { id, email, name } = newUser;

    const { token } = await prisma.token.create({
        data: {
            userId: id,
            token: emailToken.generateNewToken(),
            type: 'emailConfirmation',
            expiredAt: emailToken.generateExpirationDate()
        }
    });

    const url = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/email-confirmation/${token}`;

    const message: IMessage = {
        to: {
            name,
            email
        },
        subject: 'Confirmation email',
        template: {
            name: 'confirm-email',
            url
        }
    }

    await sendEmail(message);

    return res.status(201).json({ id });
};

export const emailConfirmation = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        // Check the database to see if the token is present and the expiration date has not passed.
        const confirmEmailToken = await prisma.token.findFirst({
            where: {
                token,
                type: 'emailConfirmation',
                expiredAt: {
                    gte: new Date()
                }
            }
        });

        const user = await prisma.user.findFirst({
            where: {
                id: confirmEmailToken?.userId
            }
        })

        if (!user)
            throw new BadRequestError('There is no user with this email in our database.');

        // If the token is expired, the confirmation email will be sent again.
        if (!confirmEmailToken || confirmEmailToken.used) {
            await resendEmail(user, token);

            throw new BadRequestError('Invalid or expired confirmation token.');
        }

        // Changes the user's status to verified.
        await prisma.user.update({
            where: {
                id: user!.id
            },
            data: {
                email_verified: true
            }
        });

        // Changes the status of the token as used.
        await prisma.token.update({
            where: {
                token
            },
            data: {
                used: true
            }
        });

        await prisma.token.delete({
            where: {
                token
            }
        });

        const templateEmailConfirmed = template.generate('email-confirmed', 'Email confirmed');

        return res.status(200).send(templateEmailConfirmed);
    } catch (error: any) {
        return res.status(500).json({ message: 'An error occurred validating the email provided.' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { error, value } = validateEmail(req.body);

    if (error)
        return res.status(400).json({ message: error?.message });

    const user = await prisma.user.findFirst({
        where: {
            email: value.email
        }
    });

    if (!user)
        throw new BadRequestError('There is no user with this email in our database.');

    const { token } = await prisma.token.create({
        data: {
            userId: user!.id,
            token: emailToken.generateNewToken(),
            type: 'resetPassword',
            expiredAt: emailToken.generateExpirationDate()
        }
    });

    const url = `${process.env.BASE_URL}:3000/reset-password/${token}`;

    const message: IMessage = {
        to: {
            name: user.name,
            email: value.email
        },
        subject: 'Reset your account password',
        template: {
            name: 'reset-password',
            url
        }
    }

    await sendEmail(message);

    return res.status(200).send('Password reset email sent successfully.');
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { error, value } = validatePassword(req.body);

    if (error)
        return res.status(400).json({ message: error?.message });

    // Check the database to see if the token is present and the expiration date has not passed.
    const resetPasswordToken = await prisma.token.findFirst({
        where: {
            token,
            type: 'resetPassword',
            expiredAt: {
                gte: new Date()
            }
        }
    });

    if (!resetPasswordToken || resetPasswordToken.used)
        throw new BadRequestError('Invalid or expired reset password token.');

    // Encrypting user password.
    const hashPassword = await bcrypt.hash(value.password, 10);

    await prisma.user.update({
        where: {
            id: resetPasswordToken.userId
        },
        data: {
            password: hashPassword
        }
    });

    // Changes the status of the token as used.
    await prisma.token.update({
        where: {
            token
        },
        data: {
            used: true
        }
    });

    await prisma.token.delete({
        where: {
            token
        }
    });

    return res.status(200).send('Password reset successfully.');
};