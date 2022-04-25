import client from '../../database';
import {
  Product,
  User,
  Order,
  makeProudctStore,
  makeOrderStore,
  OrderProduct,
} from '../../models';
import { makeAuthServices } from '../../services/auth';

const store = makeOrderStore();

describe('Order model suite', () => {
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  const product: Omit<Product, 'id'> = {
    name: 'testProduct',
    price: 100,
    category: 'testCat',
  };
  const order: Omit<Order, 'id'> = {
    userId: 1,
    status: 'open',
  };
  const orderProduct: OrderProduct = { orderId: 1, productId: 1, quantity: 2 };
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
    await makeAuthServices().createAccount(user);
    await makeProudctStore().create(product);
  });
  it('Have an create method', () => {
    expect(store.create).toBeDefined;
  });
  it('Test create method', async () => {
    const result = await store.create(order);
    expect(result.id).toBe(1);
  });
  it('Have an index method', () => {
    expect(store.index).toBeDefined;
  });
  it('Test index method', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('Have an show method', () => {
    expect(store.show).toBeDefined;
  });
  it('Test show method', async () => {
    const result = await store.show(1);
    expect(result.status).toBe('open');
  });
  it('Have an addProduct method', () => {
    expect(store.addProduct).toBeDefined;
  });
  it('Test addProduct method', async () => {
    const result = await store.addProduct(orderProduct);
    expect(result.quantity).toBe(2);
  });
  it('Have a remove method', () => {
    expect(store.remove).toBeDefined;
  });
  it('Test remove method', async () => {
    await store.remove(1);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
