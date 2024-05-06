import { Container } from 'inversify';
import * as controller from './controllers'
import * as repository from './repositories'
import * as service from './services/index'
import UserService from './services/userService/userService';
// import { BookController } from './controllers/BookController';
// import { AuthorController } from './controllers/AuthorController';
// import { CategoryController } from './controllers/CategoryController';
// import { AuthController } from './controllers/AuthController';
// import { BookService } from './services/BookService';
// import { AuthorService } from './services/AuthorService';
// import { CategoryService } from './services/CategoryService';
// import { AuthService } from './services/AuthService';
// import { BookRepository } from './repositories/BookRepository';
// import { AuthorRepository } from './repositories/AuthorRepository';
// import { CategoryRepository } from './repositories/CategoryRepository';
// import { UserRepository } from './repositories/UserRepository';

const container = new Container();

// // Controllers
container.bind<controller.UserController>(controller.UserController).toSelf();
container.bind<controller.CategoryController>(controller.CategoryController).toSelf();
container.bind<controller.AuthorController>(controller.AuthorController).toSelf();
// container.bind<BookController>(BookController).toSelf();
// container.bind<AuthorController>(AuthorController).toSelf();
// container.bind<CategoryController>(CategoryController).toSelf();
// container.bind<AuthController>(AuthController).toSelf();

// // Services
container.bind<service.UserService>(service.UserService).toSelf();
container.bind<service.CategoryService>(service.CategoryService).toSelf();
container.bind<service.AuthorService>(service.AuthorService).toSelf();
// container.bind<BookService>(BookService).toSelf();
// container.bind<AuthorService>(AuthorService).toSelf();
// container.bind<CategoryService>(CategoryService).toSelf();
// container.bind<AuthService>(AuthService).toSelf();

// // Repositories
   container.bind<repository.UserRepository>(repository.UserRepository).toSelf()
   container.bind<repository.CategoryRepository>(repository.CategoryRepository).toSelf();
   container.bind<repository.AuthorRepository>(repository.AuthorRepository).toSelf();
// container.bind<BookRepository>(BookRepository).toSelf();
// container.bind<AuthorRepository>(AuthorRepository).toSelf();
// container.bind<CategoryRepository>(CategoryRepository).toSelf();
// container.bind<UserRepository>(UserRepository).toSelf();

export default container;