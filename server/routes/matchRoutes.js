const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch
} = require('../controllers/matchController');

// Applying authMiddleware to protect these routes
router.get('/:firebaseUuid', authMiddleware, getMatches);
router.get('/:id', authMiddleware, getMatchById)
router.post('/', authMiddleware, createMatch);
router.put('/:id', authMiddleware, updateMatch);
router.delete('/:id', authMiddleware, deleteMatch);

module.exports = router;
