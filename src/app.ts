/* istanbul ignore file */

import { inject, injectable } from 'inversify';
import Koa, { Context } from 'koa';
import SERVICE_ID from './config/service_id';
import { init } from './loaders/init';
import Routes from './config/routes';
import swagger from './config/swagger';
import './subscribers/register'; // all subscribers need to be imported before use

@injectable()
class App {
  protected app: Koa;

  protected routes: Routes;

  constructor(@inject(SERVICE_ID.ROUTES) routes: Routes) {
    this.app = new Koa();
    this.routes = routes;
  }

  init() {
    // init services, middleware
    init(this.app);

    // add routes
    const routes = this.routes.init();
    this.app.use(routes.routes()).use(routes.allowedMethods());

    // add swagger docs
    this.app.use(swagger.routes()).use(swagger.allowedMethods());

    // add error route
    this.app.use(({ response }: Context) => {
      response.status = 404;
      response.body = 'Not Found';
    });

    return this.app;
  }
}

export default App;
