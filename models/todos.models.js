// models/todosModel.js
const pool = require('../config/pg');

const getTodos = async () => {
  const { rows } = await pool.query('SELECT * FROM todos ORDER BY id');
  return rows;
};

const getTodoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return rows[0];
};

const addTodo = async (title) => {
  const { rows } = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  return rows[0];
};

const updateTodo = async (id, title) => {
  const { rows } = await pool.query(
    'UPDATE todos SET title = $1 WHERE id = $2 RETURNING *',
    [title, id]
  );
  return rows[0];
};

const deleteTodo = async (id) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  return true;
};

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};