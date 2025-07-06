const express = require('express');
const router = express.Router();

// Import your user controller functions here
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Route to get all users
router.get('/', getAllUsers);

// Route to get a single user by ID
router.get('/:id', getUserById);

// Route to create a new user
router.post('/', createUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
