const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['UPSC', 'GATE', 'SSC', 'Railway', 'Engineering', 'Other'] 
    },
    type: { type: String, enum: ['PDF', 'Video', 'Mock Test', 'Link'], required: true },
    url: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('StudyResource', resourceSchema);