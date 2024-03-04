// server/models/MatchRequest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchRequestSchema = new Schema({
  mentee: {
    type: String,
    ref: 'User',
    required: true
  },
  mentor: {
    type: String,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MatchRequest', matchRequestSchema);