// backend/models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  software: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Software', // Reference to the Software model
    required: true
  },
  accessLevel: {
    type: String, // e.g., 'Read', 'Write', 'Execute'
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  responseDate: {
    type: Date
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model (the admin who approved/rejected)
  },
  reason: { // Reason for approval/rejection
    type: String
  }
});

module.exports = mongoose.model('Request', requestSchema);