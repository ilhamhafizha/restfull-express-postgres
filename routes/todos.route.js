// routes/todosRoute.js
const express = require('express');
const router = express.Router();
const handler = require('../handlers/todos.handler');
const validate = require('../middlewares/todos.validate');
const { todoSchema } = require('../validators/todo.validator');

router.get('/', handler.getTodos);
router.get('/:id', handler.getTodoById);
// router.post('/', handler.createTodo);
// router.put('/:id', handler.updateTodo);
router.post('/', validate(todoSchema), handler.createTodo);
router.put('/:id', validate(todoSchema), handler.updateTodo);
router.delete('/:id', handler.deleteTodo);

module.exports = router;