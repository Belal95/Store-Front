import client from '../../database';
import { makeProudctStore, Product } from '../../models';
import { productsByCategory } from '../../services/products';

describe('products service suite', () => {
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
    await makeProudctStore().create(product);
  });
  it('tests if it gets the products by category', async () => {
    const result = await productsByCategory();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    );
    connection.release();
  });
});
