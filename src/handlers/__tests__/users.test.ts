import request from 'supertest';
import mongoose, { Connection } from 'mongoose';
import app from '../../app';

let conn: Connection;
beforeAll(async () => {
  conn = await mongoose.createConnection('mongodb://localhost:27017/myapp_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await conn.useDb(process.env.DB_NAME as string).dropDatabase();

  // seed with example user
  await conn.collection('users').insertMany([
    { _id: '1', name: 'Test User', role: 'Test Role' },
    { _id: '2', name: 'Test User 2', role: 'Test Role 2' },
  ]);
});

it('returns list of users', async () => {
  const { status, body } = await request(app.callback()).get('/users');
  expect(status).toBe(200);
  expect(body).toMatchInlineSnapshot(`
    Array [
      Object {
        "_id": "1",
        "name": "Test User",
        "role": "Test Role",
      },
      Object {
        "_id": "2",
        "name": "Test User 2",
        "role": "Test Role 2",
      },
    ]
  `);
});

it('returns user with given id', async () => {});

it('returns 404 on non-existing user', async () => {});
