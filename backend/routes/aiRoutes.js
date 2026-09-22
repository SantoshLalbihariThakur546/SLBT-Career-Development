const express = require('express');
const router = express.Router();
const { getCareerRoadmap } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Route: POST /api/ai/roadmap
router.post('/roadmap', protect, getCareerRoadmap);

module.exports = router;