import client from '../../database';
import {
  makeProudctStore,
  Order,
  OrderProduct,
  Product,
  User,
} from '../../models';
import { makeAuthServices } from '../../services/auth';
import supertest from 'supertest';
import { app } from '../..';

const request = supertest(app);

describe('Orders route suite', () => {
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
  const orderProduct: OrderProduct = {
    orderId: 1,
    productId: 1,
    quantity: 20,
  };
  const order: Order = {
    id: 1,
    userId: 1,
    status: 'completed',
  };
  let token: string;
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
    token = `Bearer ${(await makeAuthServices().createAccount(user)).token}`;
    await makeProudctStore().create(product);
  });
  it('Create an order', async () => {
    const response = await request
      .post('/api/orders/create')
      .set('Authorization', token)
      .send(order);
    expect(response.status).toBe(200);
  });
  it('Get an order', async () => {
    const response = await request
      .get(`/api/orders/show/${order.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  it('Get completed orders', async () => {
    const response = await request
      .get('/api/orders/completed')
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  it('Add a product to order', async () => {
    const response = await request
      .post(`/api/orders/${order.id}/add`)
      .send(orderProduct)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  it('Get all products associated with an order', async () => {
    const response = await request
      .get(`/api/orders/${order.id}/products`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
