import client from '../../database';
import { User } from '../../models';
import { makeAuthServices } from '../../services/auth';
import supertest from 'supertest';
import { app } from '../..';

const request = supertest(app);

describe('Users route suite', () => {
  const user: User = {
    id: 1,
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  let token: string;
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
    token = `Bearer ${(await makeAuthServices().createAccount(user)).token}`;
  });
  it('Get all users', async () => {
    const response = await request
      .get('/api/users/')
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  it('Get a user', async () => {
    const response = await request
      .get(`/api/users/${user.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
