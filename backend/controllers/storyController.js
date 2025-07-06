// backend/controllers/storyController.js

const Story = require('../models/Story');

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const { text, tag, media } = req.body;
    const userId = req.user.id; // ← comes from JWT middleware

    const newStory = new Story({
      text,
      tag,
      media,
      user: userId
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    console.error("Error creating story:", err);
    res.status(400).json({ error: err.message });
  }
};


// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate('user', 'name');
    res.json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};
