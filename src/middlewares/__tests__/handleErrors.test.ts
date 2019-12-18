import { Context } from 'koa';
import handleErrors from '../handleErrors';

class ValidationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

it('sets status and message of error', async () => {
  const ctx = {} as Context;
  const next = () => Promise.reject(new ValidationError(422, 'Invalid data'));

  await handleErrors(ctx, next);

  expect(ctx.status).toBe(422);
  expect(ctx.body).toBe('Invalid data');
});

it('sets status 500 when no error status found', async () => {
  const ctx = {} as Context;
  const next = () => {
    throw new Error('Blah');
  };

  await handleErrors(ctx, next);

  expect(ctx.status).toBe(500);
});
