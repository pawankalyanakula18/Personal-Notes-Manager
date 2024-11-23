// controllers/noteController.js
const Note = require('../models/noteModel');
const Joi = require('joi');

const createNote = async (req, res) => {
  const { title, description, category, completed } = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('Work', 'Personal', 'Others').default('Others'),
    completed: Joi.boolean().default(false),
  });

  const { error } = schema.validate({ title, description, category, completed });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newNote = new Note({
      title,
      description,
      category,
      completed,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err });
  }
};

const getAllNotes = async (req, res) => {
  const { search, category } = req.query;

  try {
    const filters = {};

    if (search) {
      filters.title = { $regex: search, $options: 'i' };  // Corrected syntax here
    }

    if (category) {
      filters.category = category;
    }

    const notes = await Note.find(filters).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note', error: err });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, completed } = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('Work', 'Personal', 'Others').default('Others'),
    completed: Joi.boolean().default(false),
  });

  const { error } = schema.validate({ title, description, category, completed });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, category, completed },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
