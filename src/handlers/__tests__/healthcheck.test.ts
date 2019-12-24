/** @jest-environment <rootDir>/config/jest/mongodb */

import Koa from 'koa';
import request from 'supertest';
import App from '../../app';
import SERVICE_ID from '../../config/service_id';
import container from '../../config/dic';

let app: Koa;
beforeAll(async () => {
  app = await container.get<App>(SERVICE_ID.APP).init();
});

it('returns 200 on successful ping', async () => {
  const { status } = await request(app.callback()).get('/healthcheck');
  expect(status).toBe(200);
});
