/** @jest-environment <rootDir>/config/jest/mongodb */

import request from 'supertest';
import { Connection } from 'mongoose';
import app from '../../app';
import { createConn } from '../../utils/tests/dbHelper';

let conn: Connection;
beforeAll(async () => {
  conn = await createConn();
});

beforeEach(async () => {
  await conn.dropDatabase();

  // seed with example user
  await conn.collection('users').insertMany([
    { _id: '1', name: 'Test User', role: 'Test Role' },
    { _id: '2', name: 'Test User 2', role: 'Test Role 2' },
  ]);
});

it('returns list of users', async () => {
  const { status, body } = await request(app.callback()).get('/users');
  expect(status).toBe(200);
  expect(body).toEqual([
    { _id: '1', name: 'Test User', role: 'Test Role' },
    { _id: '2', name: 'Test User 2', role: 'Test Role 2' },
  ]);
});

it('returns user with given id', async () => {
  const { status, body } = await request(app.callback()).get('/users/2');
  expect(status).toBe(200);
  expect(body).toEqual({ _id: '2', name: 'Test User 2', role: 'Test Role 2' });
});

it('returns 404 on non-existing user', async () => {
  const { status } = await request(app.callback()).get('/users/3');
  expect(status).toBe(404);
});
