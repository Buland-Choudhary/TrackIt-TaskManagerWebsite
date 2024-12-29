const pool = require('../config/db');

// Sample function for fetching users (example)
const getUsers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUsers,
};
