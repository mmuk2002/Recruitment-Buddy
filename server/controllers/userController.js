// server/controllers/userController.js

// Get a user's profile
exports.getUser = (req, res) => {
  res.send('User profile data');
};

// Create a new user
exports.createUser = (req, res) => {
  res.send('User created');
};

// Update a user
exports.updateUser = (req, res) => {
  res.send('User updated');
};

// Delete a user
exports.deleteUser = (req, res) => {
  res.send('User deleted');
};