import { User } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import { emailToken } from '../../utils/email-token';
import { sendEmail } from './send-email';
import { IMessage } from '../../interfaces/email';

/**
 * This function is responsible for sending confirmation emails when the token has expired.
 * @param user User
 * @param token string
 * @returns Promise
 */
export const resendEmail = async (user: User, token: string) => {
    try {
        // Deletes the expired token.
        await prisma.token.delete({
            where: {
                token
            }
        });

        const newEmailConfirmationToken = emailToken.generateNewToken();

        await prisma.token.create({
            data: {
                userId: user.id,
                token: newEmailConfirmationToken,
                type: 'emailConfirmation',
                expiredAt: emailToken.generateExpirationDate()
            }
        });

        const url = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/email-confirmation/${token}`;

        const message: IMessage = {
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Confirmation email',
            template: {
                name: 'confirm-email',
                url
            }
        }

        await sendEmail(message);
    } catch (error: any) {
        throw new Error('An error occurred when trying to resend the confirmation email.');
    }
};