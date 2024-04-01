// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser, getAllUsers, getUserByFirebaseUid} = require('../controllers/userController');
const authMiddleware = require("../middleware/auth");

// Routes for user operations
router.get('/:userId', authMiddleware, getUser);        // only for authenticated users
router.get('/firebase/:firebaseUid', authMiddleware, getUserByFirebaseUid); // new route
router.post('/', createUser);
router.put('/:userId', authMiddleware, updateUser);     // only for authenticated users
router.delete('/:userId', authMiddleware, deleteUser);  // only for authenticated users
router.get('/', getAllUsers); // only for authenticated users
router.get('/firebaseUid/:firebaseUid', getUserByFirebaseUid);

module.exports = router;