/* istanbul ignore file */

import Koa, { Context } from 'koa';
import { init } from './loaders/init';
import routes from './config/routes';
import swagger from './config/swagger';

const app: Koa = new Koa();

// init services, middleware
init(app);

// add routes
app.use(routes.routes()).use(routes.allowedMethods());

// add swagger docs
app.use(swagger.routes()).use(swagger.allowedMethods());

// add error route
app.use(({ response }: Context) => {
  response.status = 404;
  response.body = 'Not Found';
});

export default app;
