// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Routes for user operations
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;