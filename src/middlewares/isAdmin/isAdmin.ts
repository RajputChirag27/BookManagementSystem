import { injectable } from "inversify";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest, User } from "../../interfaces";
import { UserModel } from "../../models";
import { BaseMiddleware } from "inversify-express-utils";
import { errorCodes } from "../../constants";

@injectable()
export class IsAdminMiddleware extends BaseMiddleware {
    async handler(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            // const user: User = await UserModel.findOne({ email: req.user.email });
            const user = req.user;
            console.log(user)
            if (!user || user.role !== 'admin') {
                res.status(errorCodes.FORBIDDEN).send("Not Permitted because you are not an Admin");
            } else {
                next();
            }
        } catch (error) {
            console.error("Error in isAdmin middleware:", error);
            res.status(errorCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        }
    }
}
