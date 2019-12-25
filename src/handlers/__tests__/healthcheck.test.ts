/** @jest-environment <rootDir>/config/jest/mongodb */

import Koa from 'koa';
import request from 'supertest';
import container from '../../config/dic';
import App from '../../app';

let app: Koa;
beforeAll(async () => {
  app = await container.get<App>(App).init();
});

it('returns 200 on successful ping', async () => {
  const { status } = await request(app.callback()).get('/healthcheck');
  expect(status).toBe(200);
});
