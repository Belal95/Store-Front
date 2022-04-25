import client from '../database';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

async function index(): Promise<User[]> {
  try {
    const sql: string =
      'SELECT id, first_name, last_name, username FROM "users"';
    const connection = await client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function create(user: Omit<User, 'id'>): Promise<User> {
  try {
    const sql: string =
      'INSERT INTO "users" (first_name, last_name, username, password) VALUES ($1,$2,$3,$4) RETURNING id , username , first_name, last_name';
    const connection = await client.connect();
    const result = await connection.query(sql, [
      user.firstName,
      user.lastName,
      user.username,
      user.password,
    ]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function show(id: number): Promise<User> {
  try {
    const sql: string =
      'SELECT id, first_name, last_name, username FROM "users" WHERE id=$1';
    const connection = await client.connect();
    const result = await connection.query(sql, [id]);
    if (result.rowCount === 0) throw new Error('Cannot find user');
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function getUser(
  username: string
): Promise<{ id: number; username: string; password: string }> {
  try {
    const sql: string =
      'SELECT id, username, password FROM "users" WHERE username=$1';
    const connection = await client.connect();
    const result = await connection.query(sql, [username]);
    if (result.rowCount === 0) throw new Error('Cannot find user');
    return result.rows[0];
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function remove(id: number): Promise<string> {
  try {
    const sql: string = 'DELETE FROM "users" WHERE id=$1';
    const connection = await client.connect();
    await connection.query(sql, [id]);
    connection.release();
    return `user ${id} deleted`;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export function makeUserStore() {
  return {
    index,
    show,
    create,
    remove,
    getUser,
  };
}
