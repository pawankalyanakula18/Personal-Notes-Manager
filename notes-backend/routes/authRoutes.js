// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller methods
const authController = require('../controllers/authController');

// Define routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Export the router instance
module.exports = router;
