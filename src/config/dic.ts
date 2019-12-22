import 'reflect-metadata';
import { EventDispatcher } from 'event-dispatch';
import { Container, decorate, injectable } from 'inversify';
import SERVICE_ID from './service_id';
import Server from '../server';
import App from '../app';
import Routes from './routes';
import UsersHandler from '../handlers/users';
import { UsersService } from '../services/repositories/users';

const container = new Container();

// decorate external libraries
decorate(injectable(), EventDispatcher);

container.bind<Server>(SERVICE_ID.SERVER).to(Server);
container.bind<App>(SERVICE_ID.APP).to(App);
container.bind<Routes>(SERVICE_ID.ROUTES).to(Routes);
container.bind<UsersHandler>(SERVICE_ID.USERS_HANDLER).to(UsersHandler);
container.bind<UsersService>(SERVICE_ID.USERS_SERVICE).to(UsersService);
container.bind<EventDispatcher>(SERVICE_ID.EVENT_DISPATCHER).to(EventDispatcher);

export default container;
