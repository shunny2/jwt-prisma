import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export const generateRefreshToken = async (userId: string) => {
    const expiresIn = dayjs().add(15, "second").unix();

    const generateRefresh = await prisma.refreshToken.create({
        data: {
            userId,
            expiresIn
        }
    });

    return { generateRefresh };
}

export const generateNewToken = async (refreshToken: string) => {
    const refreshTokenIsValid = await prisma.refreshToken.findFirst({
        where: {
            id: refreshToken
        }
    });

    if (!refreshTokenIsValid)
        return new Error ('Invalid Token!');

    const token = jwt.sign({ subject: refreshTokenIsValid.userId }, process.env.JWT_SECRET, { expiresIn: '100s' });

    return { token };
};