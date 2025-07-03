const express = require('express');
const router = express.Router();
const pool = require('../config/pg');


router.post('/', async (req, res) => {
  const { level } = req.body;
  try {
    const result = await pool.query('INSERT INTO priorities (level) VALUES ($1) RETURNING *', [level]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM priorities');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
