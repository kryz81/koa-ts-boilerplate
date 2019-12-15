import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import routes from './config/routes';
import handleErrors from './middlewares/handleErrors';
import { DB_HOST, DB_NAME } from './config/config';

const app: Koa = new Koa();

// connect to db
const dbUrl = `mongodb://${DB_HOST}/${DB_NAME}`;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log(`Connected to ${dbUrl}`))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err.message));

// add middleware
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(handleErrors);

// add routes
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
