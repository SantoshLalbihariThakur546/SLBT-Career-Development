const express = require('express');
const router = express.Router();

// Import the unified controller functions
const { 
    bookConsultation, 
    getConsultations,
    getMyConsultations,
    assignCounselor,
    updateConsultation
} = require('../controllers/consultationController');

// Import authentication middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// ==========================================
// PUBLIC ROUTES
// ==========================================
// POST /api/consultations/book - Students booking from the homepage
router.post('/book', bookConsultation);

// ==========================================
// PROTECTED ROUTES
// ==========================================
// Apply protection middleware to all routes below this line
router.use(protect);

// Counselor & Admin Routes
router.get('/', authorize('Admin', 'Counselor'), getConsultations);
router.get('/my-queue', authorize('Counselor'), getMyConsultations);
router.put('/:id/assign', authorize('Admin', 'Counselor'), assignCounselor);
router.put('/:id', authorize('Admin', 'Counselor'), updateConsultation);

module.exports = router;