const Appointment = require('../models/Appointment');

// @desc    Book a new counseling appointment
// @route   POST /api/appointments
// @access  Private (Student)
const bookAppointment = async (req, res) => {
    try {
        const { date, time, objective } = req.body;

        if (!date || !time || !objective) {
            return res.status(400).json({ message: 'Please provide date, time, and objective' });
        }

        const appointment = await Appointment.create({
            student: req.user.id,
            date,
            time,
            objective
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error booking appointment' });
    }
};

// @desc    Get logged-in student's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ student: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error retrieving appointments' });
    }
};

// @desc    Get ALL appointments (For Admin/Counselor Panel)
// @route   GET /api/appointments
// @access  Private/Admin
const getAllAppointments = async (req, res) => {
    try {
        // .populate() pulls in the student's name and email from the User collection
        const appointments = await Appointment.find().populate('student', 'name email').sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error retrieving all appointments' });
    }
};
// @desc    Update appointment status & notes (Admin/Counselor)
// @route   PUT /api/appointments/:id
// @access  Private/Admin
// NEW FUNCTION: Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } 
        );
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error updating appointment' });
    }
};
// Make sure to add it to your exports at the very bottom!
module.exports = { bookAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus };