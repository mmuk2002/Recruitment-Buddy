// const express = require('express');
// const router = express.Router();
// //CHNAGES
// const authMiddleware = require('../middleware/auth');
// //CHNAGES
// const { createMatch, getMatch, updateMatch, deleteMatch } = require('../controllers/matchController');

// // Route to create a new match
// router.post('/', authMiddleware, createMatch);

// // Route to get all matches
// router.get('/:matchId', authMiddleware, getMatch);

// // Route to update a match by ID
// router.put('/:id', authMiddleware, updateMatch);

// // Route to delete a match by ID
// router.delete('/:id', authMiddleware, deleteMatch);

// module.exports = router;



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
router.get('/', authMiddleware, getMatches);
router.get('/:id', authMiddleware, getMatchById)
router.post('/', authMiddleware, createMatch);
router.put('/:id', authMiddleware, updateMatch);
router.delete('/:id', authMiddleware, deleteMatch);

module.exports = router;
