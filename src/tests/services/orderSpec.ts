import { completedOrders } from '../../services/order';
import { makeOrderStore, Order, User } from '../../models';
import client from '../../database';
import { makeAuthServices } from '../../services/auth';

describe('Order service suite', () => {
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  const order: Omit<Order, 'id'> = {
    userId: 1,
    status: 'completed',
  };
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
    await makeAuthServices().createAccount(user);
    await makeOrderStore().create(order);
  });
  it('tests completed orders method', async () => {
    const result = await completedOrders();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
