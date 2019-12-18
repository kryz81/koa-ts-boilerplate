import Koa, { Context } from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';

import { DB_ENDPOINT } from './config/config';
import routes from './config/routes';
import swagger from './config/swagger';
import handleErrors from './middlewares/handleErrors';

const app: Koa = new Koa();

// connect to db and hide deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(DB_ENDPOINT)
  // eslint-disable-next-line no-console
  .then(() => console.log(`Connected to ${DB_ENDPOINT}`))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err.message));

// add middleware
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(handleErrors);

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
