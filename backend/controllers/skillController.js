const SkillUpdate = require('../models/SkillUpdate');

exports.createSkillUpdate = async (req, res) => {
  try {
    const newUpdate = new SkillUpdate({
      user: req.user.id,
      text: req.body.text
    });
    const savedUpdate = await newUpdate.save();
    res.status(201).json(savedUpdate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create skill update' });
  }
};

exports.getSkillUpdates = async (req, res) => {
  try {
    const updates = await SkillUpdate.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skill updates' });
  }
};
