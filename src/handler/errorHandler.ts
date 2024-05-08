import { Request, Response, NextFunction } from 'express';
import CustomError from '../helpers/customError';
import { errorCodes } from '../constants';

const customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (err.code == 11000) {
            err = new CustomError("Duplicate Field Value Enter ", errorCodes.NOT_FOUND);
        }

        if (err.name === 'SyntaxError') {
            err = new CustomError('Unexpected Sytax ', errorCodes.BAD_REQUEST);
        }
        if (err.name === 'ValidationError') {
            err = new CustomError(err.message, errorCodes.BAD_REQUEST);
        }

        if (err.name === "CastError") {
            err = new CustomError("Please provide a valid id  ", errorCodes.BAD_REQUEST);
        }
        if (err.name === "TokenExpiredError") {
            err = new CustomError("Jwt expired  ", errorCodes.UNAUTHORIZED);
        }
        if (err.name === "JsonWebTokenError") {
            err = new CustomError("Jwt malformed  ", errorCodes.UNAUTHORIZED);
        }

        console.log("Custom Error Handler => ", err.name, err.message, err.statusCode);

        // Check if res object is defined before accessing its properties
        if (res) {
            return res.status(err.statusCode || 500).json({
                success: false,
                error: err.message || "Server Error"
            });
        } else {
            throw new Error('Response object is not defined');
        }
    } catch (error) {
        next(error); // Forward the error to the next error handler
    }
}

export default customErrorHandler;
