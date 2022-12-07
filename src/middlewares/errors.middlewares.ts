import { NextFunction, Request, Response } from "express";

interface Errors extends Error {
    statusCode: number;
}

export const errors = (error: Errors, _: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    return res.status(statusCode).json({ message: message });
};