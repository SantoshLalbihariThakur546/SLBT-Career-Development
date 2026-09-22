const mongoose = require('mongoose');

const studyLogSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    subject: { type: String, required: true },
    hours: { type: Number, required: true },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('StudyLog', studyLogSchema);