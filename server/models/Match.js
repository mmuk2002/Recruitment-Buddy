// server/models/Match.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
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
    enum: ['active', 'completed', 'canceled'],
    default: 'active'
  },
  startTime: {
    type: Date,
    required: false // This can be optional, as they might use Calendly to schedule.
  },
  contactInfo: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: false // This should only be provided after a match is accepted.
    },
    phone: {
      type: String,
      trim: true,
      required: false // Same as email.
    }
  },
}, {
  timestamps: true // To automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Match', matchSchema);