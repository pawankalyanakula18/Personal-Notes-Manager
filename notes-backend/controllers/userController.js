const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

// Sign Up - Register new user
exports.signup = async (req, res) => {
  // Destructure the parameters from req.body
  const { username, email, password } = req.body;

  // Log the parameters for debugging
  console.log("Sign-Up invoked with parameters: Username:", username);

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,   // Added username
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message and user details
    res.status(201).json({
      message: 'User created successfully',
      user: { _id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};
