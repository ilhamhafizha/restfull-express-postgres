// config/pg.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-shiny-salad-a1gyvoh4-pooler.ap-southeast-1.aws.neon.tech',
  database: 'todos',
  password: 'npg_U0D1nKdfoWOh',
  port: 5432,
  ssl: true,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack));

module.exports = pool;
