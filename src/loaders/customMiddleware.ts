import Koa from 'koa';
import handleErrors from '../middlewares/handleErrors';

const customMiddleware = (app: Koa) => {
  app.use(handleErrors);
};

export default customMiddleware;
