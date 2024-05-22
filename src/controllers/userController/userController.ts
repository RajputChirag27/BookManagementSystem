import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { NextFunction, Request, Response } from 'express'
import UserService from '../../services/userService/userService'
import { inject } from 'inversify'
import { User } from '../../interfaces/index'
import dotenv from 'dotenv'
import { customErrorHandler } from '../../handler'
import { AuthenticatedRequest } from '../../interfaces'
import {
  JwtAuthenticationMiddleware,
  ValidatorMiddleWare,
} from '../../middlewares'
dotenv.config()

@controller('/users')
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpPost('/signup', ValidatorMiddleWare)
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body
      // Hash password
      const hashedPassword: string = await this.userService.hashPassword(
        user.password
      )
      user.password = hashedPassword
      // Create new user
      const newUser = await this.userService.signup(user)
      res.status(201).json(newUser)
    } catch (error) {
      customErrorHandler(error, req, res, next)
    }
  }

  @httpPost('/login')
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body

      const userFromDb = await this.userService.login(user)
      // console.log(userFromDb)
      if (userFromDb) {
        user.role = userFromDb.role
        // console.log(user);
        const payload = user
        // Create a token
        const token = await this.userService.createToken(payload)
        // console.log(token)
        res.send({ userFromDb, token })
      } else {
        res.send('User not found')
      }
    } catch (err) {
      customErrorHandler(err, req, res, next)
    }
  }

  @httpGet('/protected', JwtAuthenticationMiddleware)
  async protected(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.send('Protected Route')
    } catch (err) {
      customErrorHandler(err, req, res, next)
    }
  }
}
