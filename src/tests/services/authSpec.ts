import { JwtPayload } from 'jsonwebtoken';
import client from '../../database';
import { User } from '../../models';
import { makeAuthServices } from '../../services/auth';

const service = makeAuthServices();

describe('Auth service suite', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
  let token: string;
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  it('Tests creatAccount method', async () => {
    const result = await service.createAccount(user);
    token = result.token;
    expect(result.username).toBe('testUsername');
    expect(token).toBeDefined();
  });
  it('Tests login method', async () => {
    const result = await service.login('testUsername', 'testPassword');
    expect(result.token).toBeDefined();
    expect(result.username).toBe('testUsername');
  });
  it('Tests verify method', () => {
    const { username } = service.verfiy(token) as JwtPayload;
    expect(username).toBe('testUsername');
  });
  it('Tests if verfiy method will rejct a fake token', () => {
    expect(() => service.verfiy(token.slice(5))).toThrow();
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
