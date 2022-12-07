import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { validateSignIn } from '../helpers';
import { verifyToken } from '../middlewares';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../helpers/api-errors';

dotenv.config();

const authRoutes = Router();

authRoutes.get('/', verifyToken, async (_, res: Response) => {
    return res.status(200).json({ message: 'Welcome to the API' });
});

authRoutes.get('/me', verifyToken, async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
});

authRoutes.post('/signIn', async (req: Request, res: Response) => {
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
    const verifyPassword = await bcrypt.compare(value.password, user.password);

    if (!verifyPassword)
        throw new BadRequestError('Invalid email or password!');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_REFRESH_SECRET });

    // Set maxAge with 1 day.
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

    return res.status(200).json({ token });
});

authRoutes.get('/refresh', async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt)
        throw new UnauthorizedError();

    const refreshToken = cookies.jwt;

    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err: any, decode: any) => {
            if (err)
                throw new UnauthorizedError();

            const token = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

            return res.status(200).json({ token });
        });
    } catch (error: any) {
        throw new ForbiddenError();
    }
});

authRoutes.get('/logout', async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt)
        return res.sendStatus(204);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', maxAge: 1, secure: true });

    return res.sendStatus(204);
});

export default authRoutes;