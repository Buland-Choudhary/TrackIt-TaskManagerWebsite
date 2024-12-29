const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware.authenticateUser, taskController.createTask); // Create task
router.get('/', authMiddleware.authenticateUser, taskController.getTasks); // Get tasks
router.put('/', authMiddleware.authenticateUser, taskController.updateTask); // Update task
router.delete('/:taskId', authMiddleware.authenticateUser, taskController.deleteTask); // Delete task

module.exports = router;
