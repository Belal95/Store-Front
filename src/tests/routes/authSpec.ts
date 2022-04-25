import supertest from 'supertest';
import { app } from '../..';
import client from '../../database';
import { User } from '../../models';

const request = supertest(app);

describe('Auth route suite', () => {
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
  it('Create an acoount', async () => {
    const response = await request.post('/api/user/register').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it('Log in with account', async () => {
    const response = await request.post('/api/user/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it('Fail to log in', async () => {
    const response = await request
      .post('/api/user/login')
      .send({ username: 'wrongUser', password: 'wrongPassword' });
    expect(response.status).toBe(404);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
