// handlers/todosHandler.js
let todos = require('../models/todosModel');

const getAllTodos = (req, res) => {
  res.json(todos);
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

const createTodo = (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initialLength)
    return res.status(404).json({ message: "Todo not found" });

  // Update model
  require.cache[require.resolve('../models/todosModel')].exports = todos;

  res.json({ message: "Todo deleted" });
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
