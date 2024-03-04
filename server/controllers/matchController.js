const Match = require('../models/Match');

// Get all matches
exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate('mentee mentor');
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single match by ID
exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id).populate('mentee mentor');
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

// Update a match by ID
exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a match by ID
exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.json({ message: 'Match deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
