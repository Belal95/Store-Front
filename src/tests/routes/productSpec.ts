import client from '../../database';
import { Product, User } from '../../models';
import { makeAuthServices } from '../../services/auth';
import supertest from 'supertest';
import { app } from '../..';

const request = supertest(app);

describe('Products route suite', () => {
  const user: Omit<User, 'id'> = {
    firstName: 'testFirst',
    lastName: 'testLast',
    username: 'testUsername',
    password: 'testPassword',
  };
  const product: Product = {
    id: 1,
    name: 'testProduct',
    price: 100,
    category: 'testCat',
  };
  let token: string;
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
    token = `Bearer ${(await makeAuthServices().createAccount(user)).token}`;
  });
  it('Create a product', async () => {
    const response = await request
      .post('/api/products/create')
      .send(product)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  it('Get a product', async () => {
    const response = await request.get(`/api/products/show/${product.id}`);
    expect(response.status).toBe(200);
  });
  it('Get all products', async () => {
    const response = await request.get('/api/products/');
    expect(response.status).toBe(200);
  });
  it('Get products by category', async () => {
    const response = await request.get('/api/products/category');
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM "users";\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
