import { inject, injectable } from 'inversify';
import Router from 'koa-router';
import HealthcheckHandler from '../handlers/healthcheck';
import SERVICE_ID from './service_id';
import UsersHandler from '../handlers/users';

@injectable()
class Routes {
  protected router: Router;

  protected usersHandler: UsersHandler;

  protected healthcheckHandler: HealthcheckHandler;

  constructor(
    @inject(SERVICE_ID.USERS_HANDLER) usersHandler: UsersHandler,
    @inject(SERVICE_ID.HEALTHCHECK_HANDLER) healthcheckHandler: HealthcheckHandler,
  ) {
    this.router = new Router();
    this.usersHandler = usersHandler;
    this.healthcheckHandler = healthcheckHandler;
  }

  init(): Router {
    this.router

      // diagnostics
      .get('/healthcheck', (ctx) => this.healthcheckHandler.ping(ctx))

      // users
      .get('/users', (ctx) => this.usersHandler.getUserList(ctx))
      .get('/users/:id', (ctx) => this.usersHandler.getUserDetails(ctx))
      .post('/users', (ctx) => this.usersHandler.addUser(ctx))
      .put('/users/:id', (ctx) => this.usersHandler.updateUser(ctx))
      .delete('/users/:id', (ctx) => this.usersHandler.deleteUser(ctx));

    return this.router;
  }
}

export default Routes;
