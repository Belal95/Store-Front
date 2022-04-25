import { makeUserStore, User } from '../../models';
import client from '../../database';

const store = makeUserStore();

describe('User model suite', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  it('Have an create method', () => {
    expect(store.create).toBeDefined;
  });
  it('Test create method with a test user', async () => {
    const result = await store.create(user);
    expect(result.username).toBe(user.username);
  });
  it('Have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Test the index method', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('Have an show method', () => {
    expect(store.show).toBeDefined;
  });
  it('Test show method', async () => {
    const result = await store.show(1);
    expect(result.id).toBe(1);
  });
  it('Have a getUser method', () => {
    expect(store.getUser).toBeDefined;
  });
  it('Test getUser method', async () => {
    const result = await store.getUser('testUsername');
    expect(result.id).toBe(1);
  });
  it('Have a remove method', async () => {
    expect(store.remove).toBeDefined;
  });
  it('Test remove method', async () => {
    await store.remove(1);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
