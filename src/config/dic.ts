import 'reflect-metadata';
import { Container } from 'inversify';
import SERVICE_ID from './service_id';
import Server from '../server';
import App from '../app';
import Routes from './routes';
import UsersHandler from '../handlers/users';
import { UsersService } from '../services/users';

const container = new Container();

container.bind<Server>(SERVICE_ID.SERVER).to(Server);
container.bind<App>(SERVICE_ID.APP).to(App);
container.bind<Routes>(SERVICE_ID.ROUTES).to(Routes);
container.bind<UsersHandler>(SERVICE_ID.USERS_HANDLER).to(UsersHandler);
container.bind<UsersService>(SERVICE_ID.USERS_SERVICE).to(UsersService);

export default container;
