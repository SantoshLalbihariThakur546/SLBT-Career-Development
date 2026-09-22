const express = require('express');
const router = express.Router();
const { getResources, addStudyLog, getStudyLogs } = require('../controllers/preparationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/resources/:category', protect, getResources);
router.post('/log', protect, addStudyLog);
router.get('/logs', protect, getStudyLogs);

module.exports = router;