// routes/todosRoute.js
const express = require('express');
const router = express.Router();
const handler = require('../handlers/todosHandler');

router.get('/', handler.getTodos);
router.get('/:id', handler.getTodoById);
router.post('/', handler.createTodo);
router.put('/:id', handler.updateTodo);
router.delete('/:id', handler.deleteTodo);

module.exports = router;
