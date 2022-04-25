import client from '../database';

export type Order = {
  id: number;
  userId: number;
  status: string;
};

export type OrderProduct = {
  orderId: number;
  productId: number;
  quantity: number;
};

export type OrderProducts = Omit<OrderProduct, 'orderId'> & {
  productName: string;
  price: number;
};

async function index(): Promise<Order[]> {
  try {
    const sql: string = 'SELECT * FROM orders';
    const connection = await client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function show(id: number): Promise<Order> {
  try {
    const sql: string = 'SELECT * FROM orders WHERE id=$1';
    const connection = await client.connect();
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function create(order: Omit<Order, 'id'>): Promise<Order> {
  try {
    const sql: string =
      'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id, user_id, status';
    const connection = await client.connect();
    const result = await connection.query(sql, [order.userId, order.status]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function addProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
  try {
    const sql =
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity';
    const connection = await client.connect();
    const result = await connection.query(sql, [
      orderProduct.orderId,
      orderProduct.productId,
      orderProduct.quantity,
    ]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function remove(id: number): Promise<string> {
  try {
    const sql: string = 'DELETE FROM orders WHERE id=$1';
    const connection = await client.connect();
    connection.query(sql, [id]);
    connection.release();
    return `deleted order number:${id}`;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export function makeOrderStore() {
  return {
    index,
    show,
    create,
    remove,
    addProduct,
  };
}
