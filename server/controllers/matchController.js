const Match = require('../models/Match');

// Get all matches for a specific user
exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find({
            $or: [
                { mentor: req.params.firebaseUuid },
                { mentee: req.params.firebaseUuid }
            ]
        });
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single match by Firebase UUID
exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findOne({ _id: req.params.id }).populate('mentee mentor');
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new match
exports.createMatch = async (req, res) => {
    try {
        const newMatch = new Match(req.body);
        const savedMatch = await newMatch.save();
        res.status(201).json(savedMatch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a match by Firebase UUID
exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a match by Firebase UUID
exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findOneAndDelete({ _id: req.params.id });
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.json({ message: 'Match deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
