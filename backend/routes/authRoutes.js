const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes - No token required
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Route - Requires a valid JWT in the Authorization header
router.get('/me', protect, getMe);

module.exports = router;