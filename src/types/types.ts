import { CategoryService } from 'src/services'
import {
  AuthorController,
  CategoryController,
  UserController
} from '../controllers'

const TYPES = {
  // Controllers
  UserController: Symbol.for('UserController'),
  CategoryController: Symbol.for('CategoryController'),
  AuthorController: Symbol.for('AuthorController'),

  // Services
  UserService: Symbol.for('UserService'),
  CategoryService: Symbol.for('CategoryService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),

  // Validators
  UserValidator: Symbol.for('UserValidator'),
  CategoryValidator: Symbol.for('CategoryValidator'),

  // Repositories
  UserRepository: Symbol.for('UserRepository')
}

export { TYPES }
