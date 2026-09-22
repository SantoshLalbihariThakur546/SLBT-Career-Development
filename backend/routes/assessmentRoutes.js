const express = require('express');
const router = express.Router();
const { submitAssessment, getAssessment } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware'); // Import our JWT checker

// Both POST and GET require the user to be logged in
router.route('/')
    .post(protect, submitAssessment)
    .get(protect, getAssessment);

module.exports = router;