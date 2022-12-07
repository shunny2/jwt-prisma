import { NextFunction, Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma';

import bcrypt from 'bcrypt';

import { validateUser } from '../helpers';
import { BadRequestError } from '../helpers/api-errors';

const userRoutes = Router();

userRoutes.get('/', async (_, res: Response) => {
    const count = await prisma.user.count()

    return res.json({ count });
});

userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
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
});

export default userRoutes;