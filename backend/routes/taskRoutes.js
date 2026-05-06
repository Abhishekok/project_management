const express = require('express');
const { createTask, getTasks, updateTaskStatus, getDashboardStats } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();
router.route('/').post(protect, adminOnly, createTask).get(protect, getTasks); // [cite: 42, 43]
router.route('/dashboard').get(protect, getDashboardStats);
router.route('/:id').patch(protect, updateTaskStatus); // [cite: 44]
module.exports = router;