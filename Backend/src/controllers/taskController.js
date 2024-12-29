const taskModel = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;
  //console.log('due date:', due_date);
  const userId = req.user.userId; // Assuming user ID is available in the request (via auth middleware)
  try {
    const taskId = await taskModel.createTask(userId, title, description, status, priority, due_date);
    res.status(201).json({ taskId });
  } catch (error) {
    res.status(500).json({ message: 'Task creation failed', error: error.message });
  }
};

// Get tasks for the logged-in user
const getTasks = async (req, res) => {
  const userId = req.user.userId; // Assuming user ID is available in the request (via auth middleware)
  try {
    const tasks = await taskModel.getTasksByUser(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { taskId, title, description, status, priority, dueDate } = req.body;
  try {
    const result = await taskModel.updateTask(taskId, title, description, status, priority, dueDate);
    if (result) {
      res.status(200).json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params; 
  //console.log('Task ID:', taskId);
  try {
    const result = await taskModel.deleteTask(taskId);
    if (result) {
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
