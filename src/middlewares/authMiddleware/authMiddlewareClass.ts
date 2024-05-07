import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { injectable } from 'inversify';
import { AuthenticatedRequest } from '../../interfaces';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class JwtAuthenticationMiddleware extends BaseMiddleware {
    handler(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
        // Extract the JWT token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const token = authHeader.slice(7); // Removed 'Bearer ' from the token string

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            // If token is valid, set decoded user data on request object
            req.user = decoded;
            next(); // Proceed to the next middleware
        });
    }
}
