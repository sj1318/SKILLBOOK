const express = require('express');
const router = express.Router();
const { createStory, getAllStories } = require('../controllers/storyController');
const verifyToken = require('../middleware/authMiddleware');

// Create story (POST) - Protected
router.post('/', verifyToken, createStory);

// Get all stories (GET) - Public
router.get('/', getAllStories);

module.exports = router;
