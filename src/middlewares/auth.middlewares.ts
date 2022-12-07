import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { validateRefreshToken } from '../helpers';

dotenv.config();

type JWTPayload = {
    id: string;
    iat: number;
    exp: number;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // Cut the received string and takes the token at position 1.
    const token = authorization && authorization.split(' ')[1];

    if (token == null)
        return res.sendStatus(401);

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user)
            return res.sendStatus(401);

        const { password, ...loggedUser } = user;
        req.user = loggedUser;

        next();
    } catch (error) {
        return res.sendStatus(403);
    }
};