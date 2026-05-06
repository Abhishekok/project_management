const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();
router.route('/').post(protect, adminOnly, createProject).get(protect, getProjects); // [cite: 40, 41]
module.exports = router;