const express = require('express');
const router = express.Router();
const pool = require('../config/pg');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM status_logs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambahkan pengecekan todo_id ada dulu
router.post('/', async (req, res) => {
  const { todo_id, status } = req.body;
  try {
    const todoCheck = await pool.query('SELECT * FROM todos WHERE id = $1', [todo_id]);
    if (todoCheck.rowCount === 0) {
      return res.status(400).json({ error: 'Todo not found!' });
    }

    const result = await pool.query(
      'INSERT INTO status_logs (todo_id, status) VALUES ($1, $2) RETURNING *',
      [todo_id, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

