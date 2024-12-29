const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();




const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/auth', authRoutes); // Authentication routes
app.use('/tasks', taskRoutes); // Task management routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

