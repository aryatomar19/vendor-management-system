require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD), // ensure it's a string
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});
