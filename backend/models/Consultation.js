const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    objective: { 
        type: String, 
        required: true,
        // Aligned exact values with what the React frontend sends (<option value="UPSC">)
        enum: ['UPSC', 'SSC', 'Engineering', 'Medical', 'Other']
    },
    qualification: { 
        type: String, 
        required: true,
        // Aligned exact values with what the React frontend sends
        enum: ['10th', '12th', 'Graduate', 'PostGraduate', 'Other']
    },
    mobile: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'Assigned', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    assignedCounselor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    notes: {
        type: String,
        default: ''
    },
    meetingLink: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);