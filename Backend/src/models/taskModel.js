const pool = require('../config/db');

const createTask = async (userId, title, description, status, priority, due_date) => {
  try {
    if (!status) status = 'Pending';
    if (!priority) priority = 'Medium';
    if (!due_date) {
      var date = new Date();
      date.setDate(date.getDate() + 7);
      due_date = date.toISOString().split('T')[0];
    }
    if (!title) title = 'Untitled';
    if (!description) description = 'No description';

    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description, status, priority, due_date]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
};


// Get all tasks for a user
const getTasksByUser = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
  return rows;
};

const updateTask = async (taskId, title, description, status, priority, due_date) => {
  const fields = [];
  const values = [];

  // Add only the fields that are not undefined to the query
  if (title !== undefined) {
    fields.push('title = ?');
    values.push(title);
  }
  if (description !== undefined) {
    fields.push('description = ?');
    values.push(description);
  }
  if (status !== undefined) {
    fields.push('status = ?');
    values.push(status);
  }
  if (priority !== undefined) {
    fields.push('priority = ?');
    values.push(priority);
  }
  if (due_date !== undefined) {
    fields.push('due_date = ?');
    values.push(due_date);
  }

  // Add the task ID at the end of the values array
  values.push(taskId);

  // Join the fields to create the SET part of the query
  const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

  // Execute the query
  const [result] = await pool.query(query, values);
  return result.affectedRows;
};

// Delete a task
const deleteTask = async (taskId) => {
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
  return result.affectedRows;
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
};
