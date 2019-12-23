import 'reflect-metadata';
import { EventDispatcher } from 'event-dispatch';
import { Container, decorate, injectable } from 'inversify';
import { interfaces, TYPE } from 'inversify-koa-utils';
import HealthcheckHandler from '../handlers/healthcheck';
import SERVICE_ID from './service_id';
import Server from '../server';
import App from '../app';
import UsersHandler from '../handlers/users';
import { UsersRepository } from '../services/repositories/users';

const container = new Container();

// decorate external libraries
decorate(injectable(), EventDispatcher);

container.bind<Server>(SERVICE_ID.SERVER).to(Server);
container.bind<App>(SERVICE_ID.APP).to(App);
container.bind<UsersRepository>(SERVICE_ID.USERS_SERVICE).to(UsersRepository);
container.bind<EventDispatcher>(SERVICE_ID.EVENT_DISPATCHER).to(EventDispatcher);

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(HealthcheckHandler)
  .whenTargetNamed('HealthcheckHandler');

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(UsersHandler)
  .whenTargetNamed('UsersHandler');

export default container;
