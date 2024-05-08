import { Container } from 'inversify';
import * as controller from './controllers';
import * as repository from './repositories';
import * as service from './services/index';
import * as middleware from './middlewares/index';


const container = new Container();

//  controllers
for (const controllerName in controller) {
   const Controller = controller[controllerName];
   container.bind<typeof Controller>(Controller).toSelf();
}
// container.bind<controller.AuthorController>(controller.AuthorController).toSelf();

//  services
for (const serviceName in service) {
   const Service = service[serviceName];
   container.bind<typeof Service>(Service).toSelf();
}

// middlewares
for(const middlewareName in middleware){
   const Middleware = middleware[middlewareName];
   container.bind<typeof Middleware>(Middleware).toSelf();
}


// repositories
for (const repositoryName in repository) {
   const Repository = repository[repositoryName];
   container.bind<typeof Repository>(Repository).toSelf();
}

export default container;