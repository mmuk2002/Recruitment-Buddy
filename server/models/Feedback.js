// server/models/Feedback.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  match: {
    type: Schema.Types.ObjectId,
    ref: 'Match', // Referencing the Match model
    required: true
  },
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Feedback', feedbackSchema);