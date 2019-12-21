import { inject, injectable } from 'inversify';
import Router from 'koa-router';
import SERVICE_ID from './service_id';
import UsersHandler from '../handlers/users';

@injectable()
class Routes {
  protected router: Router;

  protected usersHandler: UsersHandler;

  constructor(@inject(SERVICE_ID.USERS_HANDLER) usersHandler: UsersHandler) {
    this.router = new Router();
    this.usersHandler = usersHandler;
  }

  init(): Router {
    this.router
      .get('/users', (ctx) => this.usersHandler.getUserList(ctx))
      .get('/users/:id', (ctx) => this.usersHandler.getUserDetails(ctx))
      .post('/users', (ctx) => this.usersHandler.addUser(ctx))
      .put('/users/:id', (ctx) => this.usersHandler.updateUser(ctx))
      .delete('/users/:id', (ctx) => this.usersHandler.deleteUser(ctx));

    return this.router;
  }
}

export default Routes;
