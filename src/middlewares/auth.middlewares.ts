import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { ForbiddenError, UnauthorizedError } from '../helpers/api-errors';

dotenv.config();

type JWTPayload = {
    id: string;
    iat: number;
    exp: number;
}

export const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // Cut the received string and takes the token at position 1.
    const token = authorization && authorization.split(' ')[1];

    if (token == null)
        throw new UnauthorizedError();

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user)
            throw new UnauthorizedError();

        const { password, ...loggedUser } = user;
        req.user = loggedUser;

        next();
    } catch (error: any) {
        throw new ForbiddenError();
    }
};