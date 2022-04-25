import config from './config';
import { Pool } from 'pg';

let client: Pool;

if (config.ENV === 'dev') {
  client = new Pool({
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  });
} else if (config.ENV === 'test') {
  client = new Pool({
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_TEST_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  });
} else throw new Error('Missing env varriable');

export default client;
