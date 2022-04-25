import client from '../database';
import { OrderProducts } from '../models';

export async function orderProducts(orderId: number): Promise<OrderProducts[]> {
  try {
    const sql =
      'SELECT products.id, products.name, products.price, order_products.quantity FROM products LEFT JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=$1';
    const connection = await client.connect();
    const result = await connection.query(sql, [orderId]);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
