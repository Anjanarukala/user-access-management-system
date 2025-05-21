// backend/models/Software.js
const mongoose = require('mongoose');

const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Software names should generally be unique
  },
  description: {
    type: String,
    required: true
  },
  accessLevels: {
    type: [String], // Array of strings, e.g., ['Read', 'Write', 'Execute']
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Software', softwareSchema);