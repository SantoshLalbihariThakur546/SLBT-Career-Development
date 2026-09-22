const express = require('express');
const router = express.Router();

// Import the new function
const { bookAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); 

router.route('/')
    .post(protect, bookAppointment)
    .get(protect, getAllAppointments); 

router.get('/my-appointments', protect, getMyAppointments);

// Add the new PUT route for updating specific appointments
router.route('/:id').put(protect, updateAppointmentStatus);

module.exports = router;
router.route('/')
    .post(protect, bookAppointment)
    .get(protect, getAllAppointments); // Later, we will add an adminMiddleware here

router.get('/my-appointments', protect, getMyAppointments);

module.exports = router;