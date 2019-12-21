import { Context, Next } from 'koa';

const handleErrors = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
};

export default handleErrors;
