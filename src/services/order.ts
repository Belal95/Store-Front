import client from '../database';
import { Order } from '../models';

export async function completedOrders(): Promise<Order[]> {
  try {
    const sql = 'SELECT * FROM orders WHERE status = $1';
    const connection = await client.connect();
    const result = await connection.query(sql, ['completed']);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
