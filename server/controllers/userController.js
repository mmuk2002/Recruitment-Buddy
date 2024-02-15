// server/controllers/userController.js

const User = require('../models/User');

// get a user's profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a user profile
exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // Add any other necessary fields
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update user profile
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the authenticated user is the user themselves
    if (user._id.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'User does not have permission to update this user' });
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name.trim();
    if (req.body.email) updates.email = req.body.email.trim();
    if (req.body.password) updates.password = req.body.password.trim();
    // Update any other necessary fields

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: updates }, { new: true, runValidators: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user profile
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the authenticated user is the user themselves
    if (user._id.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'User does not have permission to delete this user' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};