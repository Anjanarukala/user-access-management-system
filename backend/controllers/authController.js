// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log('Backend: Signup attempt for username:', username);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Backend: User already exists:', username);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Backend: Password hashed for user:', username);

    // Create new user instance
    const user = new User({ username, password: hashedPassword });
    console.log('Backend: User object created:', user);

    // Save user to database
    await user.save();
    console.log('Backend: User saved successfully:', user.username);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Backend: Server error during signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Backend: Login attempt for username:', username);
  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Backend: Login failed - User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Backend: Login failed - Password mismatch for user:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );
    console.log('Backend: User logged in successfully:', user.username, 'Role:', user.role);

    // Set token as a httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
      sameSite: 'Lax', // Protects against CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // CRITICAL CHANGE: Return userId along with token and role
    res.json({ message: 'Logged in successfully', token, role: user.role, userId: user._id });
  } catch (err) {
    console.error('Backend: Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, logout };