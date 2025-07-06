const express = require('express');
const router = express.Router();
const { createSkillUpdate, getSkillUpdates } = require('../controllers/skillController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createSkillUpdate);
router.get('/', verifyToken, getSkillUpdates);

module.exports = router;
