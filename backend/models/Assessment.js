const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    education: { type: String, required: true },
    interest: { type: String, required: true },
    skills: { type: String, required: true },
    timeCommitment: { type: String, required: true },
    recommendedPath: { type: String },
    roadmap: { type: Array }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);