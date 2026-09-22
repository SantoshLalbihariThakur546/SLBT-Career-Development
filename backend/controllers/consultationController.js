const Consultation = require('../models/Consultation');

// @desc    Create new consultation request (Student Side)
// @route   POST /api/consultations/book
// @access  Public
const bookConsultation = async (req, res) => {
    try {
        // 1. Destructure exactly what the React frontend sends
        const { name, objective, qualification, mobile } = req.body;

        // 2. Validate all fields
        if (!name || !objective || !qualification || !mobile) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // 3. Map frontend variable names to match your backend Consultation schema
        const newConsultation = await Consultation.create({
            name: name,
            careerObjective: objective, // Maps 'objective' from frontend to 'careerObjective' in DB
            qualification: qualification,
            mobileNumber: mobile        // Maps 'mobile' from frontend to 'mobileNumber' in DB
        });

        res.status(201).json({ 
            success: true, 
            message: 'Consultation booked successfully',
            data: newConsultation 
        });
    } catch (error) {
        console.error("Consultation Error:", error);
        res.status(500).json({ success: false, message: 'Server error while booking consultation', error: error.message });
    }
};

// @desc    Get all pending or assigned consultations (Admin/Counselor Side)
// @route   GET /api/consultations
// @access  Private (Admin, Counselor)
const getConsultations = async (req, res) => {
    try {
        const query = req.query.status ? { status: req.query.status } : {};
        const consultations = await Consultation.find(query)
            .populate('assignedCounselor', 'name email')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, count: consultations.length, data: consultations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get consultations assigned to the logged-in counselor
// @route   GET /api/consultations/my-queue
// @access  Private (Counselor)
const getMyConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({ assignedCounselor: req.user.id })
            .sort({ updatedAt: -1 });

        res.status(200).json({ success: true, count: consultations.length, data: consultations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Assign a counselor to a consultation request
// @route   PUT /api/consultations/:id/assign
// @access  Private (Admin, Counselor)
const assignCounselor = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({ success: false, message: 'Consultation not found' });
        }

        consultation.assignedCounselor = req.user.id;
        consultation.status = 'Assigned';
        await consultation.save();

        res.status(200).json({ success: true, data: consultation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Update consultation status, notes, and meeting links
// @route   PUT /api/consultations/:id
// @access  Private (Counselor)
const updateConsultation = async (req, res) => {
    try {
        let consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({ success: false, message: 'Consultation not found' });
        }

        // Ensure the counselor updating it is the one assigned to it (or an Admin)
        if (consultation.assignedCounselor.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this record' });
        }

        const { status, notes, meetingLink } = req.body;

        consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            { status, notes, meetingLink },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: consultation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Export all functions securely using CommonJS syntax
module.exports = {
    bookConsultation, 
    getConsultations, 
    getMyConsultations, 
    assignCounselor, 
    updateConsultation
};