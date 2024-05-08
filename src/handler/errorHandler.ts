import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    error: Error,
    res?: Response,
    req?: Request,
    next?: NextFunction
) => {
    console.log("Hello World");
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
};
