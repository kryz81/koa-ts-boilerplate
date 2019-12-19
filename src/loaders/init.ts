import Koa from 'koa';
import dbLoader from './db';
import expressLoader from './express';
import customMiddleware from './customMiddleware';

export const init = (app: Koa) => {
  dbLoader();
  expressLoader(app);
  customMiddleware(app);
};
