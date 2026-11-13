const Todo = require('../models/Todo');

// @desc   Get all todos
// @route  GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a new todo
// @route  POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update a todo (title and/or completed status)
// @route  PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (req.body.title !== undefined) {
      if (typeof req.body.title !== 'string' || req.body.title.trim() === '') {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      updates.title = req.body.title.trim();
    }

    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const updated = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted', id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
