// server/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getFeedback, createFeedback, updateFeedback, deleteFeedback } = require('../controllers/feedbackController');

// Applying authMiddleware to protect these routes
router.get('/:matchId', authMiddleware, getFeedback);  
router.post('/', authMiddleware, createFeedback);
router.put('/:id', authMiddleware, updateFeedback);
router.delete('/:id', authMiddleware, deleteFeedback);

module.exports = router;