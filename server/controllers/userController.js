// server/controllers/userController.js
const User = require('../models/User');

// Get a user's profile
exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Create a new user
exports.createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => res.json('User created'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Update a user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('User updated'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Delete a user
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
};