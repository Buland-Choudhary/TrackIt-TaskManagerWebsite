const userModel = require('../models/userModel');

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = await userModel.createUser(name, email, password);
    const token = userModel.generateAuthToken(userId);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (user && await userModel.validatePassword(password, user.password)) {
      const token = userModel.generateAuthToken(user.id);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { register, login };
