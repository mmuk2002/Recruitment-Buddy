// server/controllers/feedbackController.js
const Feedback = require('../models/Feedback');

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ match: req.params.matchId }).populate('mentor mentee match');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    // Add additional server-side validation if necessary
    const newFeedback = new Feedback({
      ...req.body,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if the authenticated user is the mentor who provided the feedback
    if (feedback.mentor.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'User does not have permission to update this feedback' });
    }

    const updates = {};
    if (typeof req.body.content === 'string') updates.content = req.body.content.trim();
    if (typeof req.body.rating === 'number' && req.body.rating >= 1 && req.body.rating <= 5) {
      updates.rating = req.body.rating;
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    res.json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if the authenticated user is the mentor who provided the feedback
    if (feedback.mentor.toString() !== req.user.uid) {
      return res.status(403).json({ message: 'User does not have permission to delete this feedback' });
    }

    await feedback.remove();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};