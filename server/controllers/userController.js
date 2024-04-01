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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a user profile
exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
      firebaseUid: req.body.firebaseUid,
      fullName: req.body.fullName,
      bio: req.body.bio,
      skills: req.body.skills,
      education: req.body.education, // expecting an array of objects
      experience: req.body.experience, // expecting an array of objects
      calendlyLink: req.body.calendlyLink
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
    const updates = {};
    if (req.body.username) updates.username = req.body.username.trim();
    if (req.body.email) updates.email = req.body.email.trim();
    if (req.body.phoneNumber) updates.phoneNumber = req.body.phoneNumber.trim();
    if (req.body.role) updates.role = req.body.role.trim();
    if (req.body.fullName) updates.fullName = req.body.fullName.trim();
    if (req.body.bio) updates.bio = req.body.bio.trim();
    if (req.body.skills) updates.skills = req.body.skills;
    if (req.body.education) updates.education = req.body.education;
    if (req.body.experience) updates.experience = req.body.experience;
    if (req.body.calendlyLink) updates.calendlyLink = req.body.calendlyLink.trim();
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
    await user.deleteOne({_id: req.params.userId});

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByFirebaseUid = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};