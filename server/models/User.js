// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'] // Simple regex for email validation
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return v ? /^\d{10}$/.test(v) : true;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: false 
  },
  role: {
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  skills: [String], // Array of strings representing skills
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date
  }],
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  // Calendly Link
  calendlyLink: {
    type: String,
    validate: {
      validator: function(v) {
        return v ? /^https:\/\/calendly\.com\/[a-zA-Z0-9_-]+$/.test(v) : true;
      },
      message: props => `${props.value} is not a valid Calendly link!`
    },
    required: false // make this optional
  },
}, {
  timestamps: true // this creates createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', userSchema);