import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import 'dotenv/config';

import { validateSignIn } from '../helpers';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../helpers/api-errors';

export const authenticated = async (_: any, res: Response) => {
    return res.status(200).json({ message: 'Welcome to the API' });
};

export const me = async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
};

export const login = async (req: Request, res: Response) => {
    const { error, value } = validateSignIn(req.body);

    if (error)
        return res.status(400).json({ message: error?.message });

    const user = await prisma.user.findUnique({
        where: {
            email: value.email
        }
    });

    if (!user)
        throw new BadRequestError('Invalid email or password!');

    // Check the user password.
    const verifyPassword = await compare(value.password, user.password);

    if (!verifyPassword)
        throw new BadRequestError('Invalid email or password!');

    const refreshToken = sign({ id: user.id, name: user.name }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_REFRESH_SECRET });

    // Set maxAge with 7 days.
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000, secure: true });

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    await prisma.token.create({
        data: {
            userId: user!.id,
            type: 'authentication',
            token: refreshToken,
            expiredAt
        }
    });

    const token = sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

    return res.status(200).json({ token });
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken)
        throw new UnauthorizedError();

    await prisma.token.delete({
        where: {
            token: refreshToken
        }
    });

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', maxAge: 0, secure: true });

    return res.sendStatus(204);
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        const payload: any = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        if (!payload)
            throw new UnauthorizedError();

        const dbToken = await prisma.token.findFirst({
            where: {
                userId: payload.id,
                type: 'authentication',
                expiredAt: {
                    gte: new Date()
                }
            }
        });

        if (!dbToken)
            throw new UnauthorizedError();

        const token = sign({ id: payload.id, name: payload.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

        return res.status(200).send({ token });
    } catch (error: any) {
        throw new ForbiddenError();
    }
};