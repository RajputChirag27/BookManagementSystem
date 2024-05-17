import { injectable, inject } from 'inversify'
import { User } from '../../interfaces'
import UserRepository from '../../repositories/userRepository/userRepository'

@injectable()
export default class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}
  async signup(user: User): Promise<User> {
    if (!user) {
      throw new Error('User details not Provided properly')
    }
    return await this.userRepository.signup(user)
  }

  async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password was not provided')
    }
    return await this.userRepository.hashPassword(password)
  }

  async login(user: User): Promise<User> {
    if (!user) {
      throw new Error('User details not Provided properly')
    }
    return await this.userRepository.login(user)
  }

  async createToken(payload: object): Promise<string> {
    return await this.userRepository.createToken(payload)
  }
}
