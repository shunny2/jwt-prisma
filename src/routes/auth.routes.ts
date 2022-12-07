import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { validateSignIn } from '../helpers';
import { verifyToken } from '../middlewares';

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

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: value.email
            }
        });

        if (!user)
            return res.status(400).json({ message: 'Invalid email or password!' });

        // Check the user password.
        const verifyPassword = await bcrypt.compare(value.password, user.password);

        if (!verifyPassword)
            return res.status(400).json({ message: 'Invalid email or password!' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_REFRESH_SECRET });

        // Set maxAge with 1 day.
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' });
    }
});

authRoutes.get('/refresh', async (req: Request, res: Response) => {
    const cookies = req.cookies;
    
    if (!cookies?.jwt)
        return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err: any, decode: any) => {
            console.log('Error:', err)
            if (err)
                return res.sendStatus(401);

            const token = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_JWT_SECRET });

            return res.status(200).json({ token });
        });
    } catch (error) {
        return res.sendStatus(403);
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