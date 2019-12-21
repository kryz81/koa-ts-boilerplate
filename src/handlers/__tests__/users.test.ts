/** @jest-environment <rootDir>/config/jest/mongodb */

import Koa from 'koa';
import request from 'supertest';
import { Connection } from 'mongoose';
import App from '../../app';
import SERVICE_ID from '../../config/service_id';
import { createConn } from '../../utils/tests/dbHelper';
import container from '../../config/dic';

let conn: Connection;
let app: Koa;
beforeAll(async () => {
  conn = await createConn();
  app = container.get<App>(SERVICE_ID.APP).init();
});

beforeEach(async () => {
  await conn.dropDatabase();

  // seed with example user
  await conn.collection('users').insertMany([
    { _id: '1', name: 'Test User', role: 'user' },
    { _id: '2', name: 'Test User 2', role: 'admin' },
  ]);
});

it('returns list of users', async () => {
  const { status, body } = await request(app.callback()).get('/users');
  expect(status).toBe(200);
  expect(body).toEqual([
    { _id: '1', name: 'Test User', role: 'user' },
    { _id: '2', name: 'Test User 2', role: 'admin' },
  ]);
});

it('returns user with given id', async () => {
  const { status, body } = await request(app.callback()).get('/users/2');
  expect(status).toBe(200);
  expect(body).toEqual({ _id: '2', name: 'Test User 2', role: 'admin' });
});

it('returns 404 on non-existing user', async () => {
  const { status } = await request(app.callback()).get('/users/3');
  expect(status).toBe(404);
});

it('creates a new user', async () => {
  const userData = {
    name: 'New User',
    role: 'user',
    email: 'user@email.dev',
  };

  // create user and get user id
  const {
    body: { userId },
  } = await request(app.callback())
    .post('/users')
    .send(userData)
    .expect(200);

  // read user and compare with user data
  const {
    body: { name, role, email },
  } = await request(app.callback()).get(`/users/${userId}`);

  expect({ name, role, email }).toEqual(userData);
});

it('returns 422 on invalid user data', async () => {
  // role is required
  const userData = {
    name: 'New User',
  };

  const { body } = await request(app.callback())
    .post('/users')
    .send(userData)
    .expect(422);

  expect(body).toMatchInlineSnapshot(`
    Object {
      "errors": Object {
        "role": Array [
          "role must be a valid enum value",
          "role should not be empty",
        ],
      },
      "msg": "Invalid user data",
    }
  `);
});

it('updates existing user', async () => {
  const userData = {
    name: 'Updated User',
    role: 'admin',
  };

  await request(app.callback())
    .put('/users/1')
    .send(userData)
    .expect(200);

  const {
    body: { name, role },
  } = await request(app.callback())
    .get('/users/1')
    .expect(200);

  expect({ name, role }).toEqual(userData);
});

it('returns 404 when no user to update found', async () => {
  await request(app.callback())
    .put('/users/3')
    .send({ name: 'Some name', role: 'user' })
    .expect(404);
});

it('returns 422 on invalid user data', async () => {
  // name is required
  const userData = {
    role: 'user',
  };

  const { body } = await request(app.callback())
    .put('/users/1')
    .send(userData)
    .expect(422);

  expect(body).toMatchInlineSnapshot(`
    Object {
      "errors": Object {
        "name": Array [
          "name must be longer than or equal to 3 characters",
          "name should not be empty",
        ],
      },
      "msg": "Invalid user data",
    }
  `);
});

it('deletes a user', async () => {
  await request(app.callback())
    .delete('/users/1')
    .expect(200);

  await request(app.callback())
    .get('/users/1')
    .expect(404);
});

it('returns 404 when the user to delete does not exist', async () => {
  await request(app.callback())
    .delete(`/users/3`)
    .expect(404);
});
