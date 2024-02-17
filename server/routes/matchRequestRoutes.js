const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { 
  createMatchRequest, 
  getMatchRequestById, 
  updateMatchRequest, 
  deleteMatchRequest 
} = require('../controllers/matchRequestController');

// Applying authMiddleware to protect these routes
router.post('/', authMiddleware, createMatchRequest); // Create a new match request
router.get('/:id', authMiddleware, getMatchRequestById); // Get a match request by ID
// router.put('/:id', authMiddleware, updateMatchRequest);
router.delete('/:id', authMiddleware, deleteMatchRequest); // Delete a match request

module.exports = router;
