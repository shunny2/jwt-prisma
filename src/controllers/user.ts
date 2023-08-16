import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

import bcrypt from 'bcrypt';

import { validateUser } from '../helpers';
import { BadRequestError } from '../helpers/api-errors';

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

    const { id } = newUser;

    return res.status(201).json({ id });
};