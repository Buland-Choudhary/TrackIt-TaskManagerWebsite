const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to create a user
const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
};

// Function to get user by email
const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // Return first row (user)
};

// Function to validate user password
const validatePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Function to generate JWT token
const generateAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = {
  createUser,
  getUserByEmail,
  validatePassword,
  generateAuthToken,
};
