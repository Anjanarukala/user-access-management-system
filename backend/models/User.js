// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensure username is unique
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Employee', 'Pending'],
    default: 'Employee' // Default role for new signups
  },
  // You can add other fields here if your application requires them, e.g., email
  // email: { type: String, required: true, unique: true }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('User', userSchema);