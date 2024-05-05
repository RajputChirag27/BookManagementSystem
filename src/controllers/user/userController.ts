import { controller, httpGet } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";


@controller('/')
export class UserController {
    @httpGet('/signup')
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('user');
        } catch (err) {
            next(err);
        }
    }
}