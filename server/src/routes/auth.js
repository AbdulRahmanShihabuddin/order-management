const express = require('express');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // In a real application, you would hash the password with bcrypt here!
  // For simplicity and matching the exact requested seed requirement, we store as plain text.
  const user = new User({ email, password });
  await user.save();

  res.status(201).json({ message: 'User registered successfully', userId: user._id, email: user.email });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', userId: user._id, email: user.email });
}));

module.exports = router;
