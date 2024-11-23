const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// Sign up (register a new user)
router.post('/signup', signup);

// Login (user authentication)
router.post('/login', login);

// Get user profile (requires JWT authentication)
router.get('/profile', authenticate, getProfile);

// Update user profile (requires JWT authentication)
router.put('/profile', authenticate, updateProfile);

// Delete user account (requires JWT authentication)
router.delete('/profile', authenticate, deleteProfile);

module.exports = router;
