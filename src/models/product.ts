import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

async function index(): Promise<Product[]> {
  try {
    const sql: string = 'SELECT * FROM products';
    const connection = await client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function show(id: number): Promise<Product> {
  try {
    const sql: string = 'SELECT * FROM products WHERE id=$1';
    const connection = await client.connect();
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function create(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const sql: string =
      'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category';
    const connection = await client.connect();
    const result = await connection.query(sql, [
      product.name,
      product.price,
      product.category,
    ]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function remove(id: number): Promise<string> {
  try {
    const sql: string = 'DELETE FROM products WHERE id=$1';
    const connection = await client.connect();
    connection.query(sql, [id]);
    connection.release();
    return `Product ${id} deleted`;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export function makeProudctStore() {
  return {
    index,
    show,
    create,
    remove,
  };
}
