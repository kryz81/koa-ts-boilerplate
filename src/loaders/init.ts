import Koa from 'koa';
import dbLoader from './db';
import agendaLoader from './agenda';
import expressLoader from './express';
import customMiddleware from './customMiddleware';

export const init = async (app: Koa) => {
  await dbLoader();
  await agendaLoader();
  expressLoader(app);
  customMiddleware(app);
};
