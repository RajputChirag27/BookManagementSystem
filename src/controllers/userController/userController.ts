import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { NextFunction, Request, Response } from 'express'
import UserService from '../../services/userService/userService'
import { inject } from 'inversify'
import { User } from '../../interfaces/index'
import dotenv from 'dotenv'
dotenv.config()

import { AuthenticatedRequest } from '../../interfaces'
import { JwtAuthenticationMiddleware } from '../../middlewares'

@controller('/users')
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpPost('/signup')
  async signup(req: Request, res: Response) {
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
    } catch (error) {}
  }

  @httpPost('/login')
  async login(req: Request, res: Response) {
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
      res.send(err)
    }
  }

  @httpGet('/protected', JwtAuthenticationMiddleware)
  async protected(req: AuthenticatedRequest, res: Response) {
    try {
      res.send('Protected Route')
    } catch (err) {
      res.send(err)
    }
  }
}
