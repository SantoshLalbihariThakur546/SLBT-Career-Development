const StudyResource = require('../models/StudyResource');
const StudyLog = require('../models/StudyLog');

// @desc    Get resources by category
// @route   GET /api/preparation/resources/:category
const getResources = async (req, res) => {
    try {
        const resources = await StudyResource.find({ category: req.params.category });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources' });
    }
};

// @desc    Log daily study hours
// @route   POST /api/preparation/log
const addStudyLog = async (req, res) => {
    try {
        const { subject, hours, notes } = req.body;
        const log = await StudyLog.create({
            student: req.user.id, // Comes from authMiddleware
            subject,
            hours,
            notes
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error saving study log' });
    }
};

// @desc    Get student's study logs
// @route   GET /api/preparation/logs
const getStudyLogs = async (req, res) => {
    try {
        const logs = await StudyLog.find({ student: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching study logs' });
    }
};

module.exports = { getResources, addStudyLog, getStudyLogs };