// server/controllers/matchRequestController.js
const MatchRequest = require('../models/MatchRequest');

exports.getMatchRequests = async (req, res) => {
  try {
    const matchRequests = await MatchRequest.find();
    res.json(matchRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMatchRequest = async (req, res) => {
  try {
    // Assuming the mentee is the authenticated user
    const newMatchRequest = new MatchRequest({
      ...req.body,
      // mentee: req.user.uid,
    });
    const savedMatchRequest = await newMatchRequest.save();
    res.status(201).json(savedMatchRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMatchRequestById = async (req, res) => {
  try {
    const matchRequest = await MatchRequest.findById(req.params.id).populate('mentee mentor');
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found' });
    }
    res.json(matchRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.updateMatchRequest = async (req, res) => {
//   try {
//     const matchRequest = await MatchRequest.findById(req.params.id);

//     if (!matchRequest) {
//       return res.status(404).json({ message: 'Match request not found' });
//     }

//     const updates = req.body;
//     const updatedMatchRequest = await MatchRequest.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
//     res.json(updatedMatchRequest);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deleteMatchRequest = async (req, res) => {
  try {
    const matchRequest = await MatchRequest.findById(req.params.id);

    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found' });
    }

    await matchRequest.deleteOne();
    res.json({ message: 'Match request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
