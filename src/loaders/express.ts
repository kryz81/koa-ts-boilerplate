import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

const expressLoader = (app: Koa) => {
  app.use(helmet());
  app.use(bodyParser());
  app.use(cors());
};

export default expressLoader;
