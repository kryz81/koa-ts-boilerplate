import { Context, Next } from 'koa';

const handleErrors = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
};

export default handleErrors;
