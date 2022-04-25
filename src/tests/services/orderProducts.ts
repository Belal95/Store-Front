import client from '../../database';
import {
  makeOrderStore,
  makeProudctStore,
  Order,
  OrderProduct,
  Product,
  User,
} from '../../models';
import { makeAuthServices } from '../../services/auth';
import { orderProducts } from '../../services/orderProducts';

describe('Porducts of an order service suite', () => {
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
    await makeOrderStore().create(order);
    await makeProudctStore().create(product);
    await makeOrderStore().addProduct(orderProduct);
  });
  it('tests if order products service return a list of products', async () => {
    const result = await orderProducts(1);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
