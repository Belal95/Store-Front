import { makeProudctStore, Product } from '../../models';
import client from '../../database';

const store = makeProudctStore();

describe('Prodect model suite', () => {
  const product: Omit<Product, 'id'> = {
    name: 'testProduct',
    price: 100,
    category: 'testCat',
  };
  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
  it('Have an create method', () => {
    expect(store.create).toBeDefined;
  });
  it('Test create method', async () => {
    const result = await store.create(product);
    expect(result.id).toBe(1);
  });
  it('Have an index method', () => {
    expect(store.index).toBeDefined;
  });
  it('Test index method', async () => {
    const results = await store.index();
    expect(results.length).toBeGreaterThanOrEqual(1);
  });
  it('Have an show method', () => {
    expect(store.show).toBeDefined;
  });
  it('Test show method', async () => {
    const result = await store.show(1);
    expect(result.name).toBe('testProduct');
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
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
