// routes/noteRoutes.js
const express = require('express');
const router = express.Router();  // You need to use express.Router()

// Import your controller methods
const noteController = require('../controllers/noteController');

// Define routes
router.post('/', noteController.createNote);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

// Export the router instance
module.exports = router;
