import client from '../database';
import { Product } from '../models';

export async function productsByCategory(): Promise<Product[]> {
  try {
    const sql = 'SELECT * FROM products ORDER BY category ASC';
    const connection = await client.connect();
    const result = await connection.query(sql);
    connection.release;
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
