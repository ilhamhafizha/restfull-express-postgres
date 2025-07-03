const db = require('../config/pg');

exports.createUser = async ({ username, email, password }) => {
  const result = await db.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
    [username, email, password]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
