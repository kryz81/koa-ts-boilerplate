import { EventDispatcher } from 'event-dispatch';
import { Container, decorate, injectable } from 'inversify';
import { interfaces, TYPE } from 'inversify-koa-utils';
import Server from '../server';
import App from '../app';
import HealthcheckHandler from '../handlers/healthcheck';
import UsersHandler from '../handlers/users';
import { UsersRepository } from '../services/repositories/users';

const container = new Container();

// decorate external libraries
decorate(injectable(), EventDispatcher);

container.bind<Server>(Server).toSelf();
container.bind<App>(App).toSelf();
container.bind<UsersRepository>(UsersRepository).toSelf();
container.bind<EventDispatcher>(EventDispatcher).toSelf();

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(HealthcheckHandler)
  .whenTargetNamed('HealthcheckHandler');

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(UsersHandler)
  .whenTargetNamed('UsersHandler');

export default container;
