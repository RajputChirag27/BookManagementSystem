import { Container } from 'inversify';
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
// container.bind<BookController>(BookController).toSelf();
// container.bind<AuthorController>(AuthorController).toSelf();
// container.bind<CategoryController>(CategoryController).toSelf();
// container.bind<AuthController>(AuthController).toSelf();

// // Services
// container.bind<BookService>(BookService).toSelf();
// container.bind<AuthorService>(AuthorService).toSelf();
// container.bind<CategoryService>(CategoryService).toSelf();
// container.bind<AuthService>(AuthService).toSelf();

// // Repositories
// container.bind<BookRepository>(BookRepository).toSelf();
// container.bind<AuthorRepository>(AuthorRepository).toSelf();
// container.bind<CategoryRepository>(CategoryRepository).toSelf();
// container.bind<UserRepository>(UserRepository).toSelf();

export default container;
