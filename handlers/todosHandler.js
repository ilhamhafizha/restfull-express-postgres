// handlers/todosHandler.js
const todoModel = require('../models/todosModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await todoModel.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = await todoModel.addTodo(title);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const updated = await todoModel.updateTodo(req.params.id, title);
    if (!updated) return res.status(404).json({ message: 'Todo not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await todoModel.deleteTodo(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
