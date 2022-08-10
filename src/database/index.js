import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE
});

client.connect();

export async function query(query, values) {
  const { rows } = await client.query(query, values);

  return rows;
}
