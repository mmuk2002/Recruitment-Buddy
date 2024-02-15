// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Routes for user operations
router.get('/:userId', authMiddleware, getUser);        // only for authenticated users
router.post('/', createUser);
router.put('/:userId', authMiddleware, updateUser);     // only for authenticated users
router.delete('/:userId', authMiddleware, deleteUser);  // only for authenticated users

module.exports = router;