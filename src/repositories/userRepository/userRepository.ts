import { injectable } from 'inversify'
import bcrypt from 'bcrypt'
import { User } from 'src/interfaces'
import { UserModel } from '../../models'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import CustomError from '../../helpers/customError'
import { errorCodes } from '../../constants'
config()

@injectable()
export default class UserRepository {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword: string = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  async signup(user: User): Promise<User> {
    return await UserModel.create(user)
  }

  async login(user: User): Promise<User> {
    const userFound: User = await UserModel.findOne({ email: user.email })
    if (!userFound) {
      throw new CustomError(
        'User not found',
        errorCodes.NOT_FOUND,
        'NotFoundError'
      )
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      user.password,
      userFound.password
    )
    if (!isPasswordValid) {
      throw new CustomError(
        'Invalid password',
        errorCodes.BAD_REQUEST,
        'InvalidPassword'
      )
    }

    return userFound
  }

  async createToken(payload: object): Promise<string> {
    const secretKey = process.env.JWT_SECRET_KEY
    const token: string = await jwt.sign(payload, secretKey, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    })
    return token
  }
}
