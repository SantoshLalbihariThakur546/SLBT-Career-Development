const Assessment = require('../models/Assessment');

// @desc    Submit assessment and generate career path
// @route   POST /api/assessments
// @access  Private
const submitAssessment = async (req, res) => {
    try {
        const { education, interest, skills, timeCommitment } = req.body;

        if (!education || !interest || !skills || !timeCommitment) {
            return res.status(400).json({ message: 'Please answer all assessment questions' });
        }

        // 🧠 Basic Career Recommendation Engine
        let recommendedPath = 'General Career Track';
        let roadmap = [];

        if (interest === 'Technology' || skills.includes('Coding')) {
            recommendedPath = 'Software Development & Cyber Security';
            roadmap = [
                { month: 'Month 1-2', task: 'Master core programming (Python/Java) and Data Structures.', status: 'Pending' },
                { month: 'Month 3-4', task: 'Build foundational projects and learn basic networking/security concepts.', status: 'Locked' },
                { month: 'Month 5-6', task: 'Advanced tech stack, portfolio building, and mock interviews.', status: 'Locked' }
            ];
        } else if (interest === 'Government') {
            recommendedPath = 'UPSC / State PSC';
            roadmap = [
                { month: 'Month 1-3', task: 'NCERT basics, daily current affairs, and syllabus mapping.', status: 'Pending' },
                { month: 'Month 4-8', task: 'Standard reference books, answer writing practice.', status: 'Locked' },
                { month: 'Month 9-12', task: 'Mock test series, revision, and interview prep.', status: 'Locked' }
            ];
        } else if (interest === 'Data') {
             recommendedPath = 'Data Analytics & Data Science';
             roadmap = [
                { month: 'Month 1-2', task: 'Learn Python, Pandas, and basic SQL.', status: 'Pending' },
                { month: 'Month 3-4', task: 'Master Power BI/Tableau for visualizations.', status: 'Locked' },
                { month: 'Month 5-6', task: 'Machine learning basics and portfolio projects.', status: 'Locked' }
            ];
        } else {
            recommendedPath = 'Engineering / Technical Core';
            roadmap = [
                { month: 'Month 1', task: 'Identify core engineering domain focus.', status: 'Pending' },
                { month: 'Month 2-3', task: 'Skill up on industry-standard software and tools.', status: 'Locked' }
            ];
        }

        // Save to Database
        const assessment = await Assessment.create({
            user: req.user.id, // Comes from the JWT token middleware
            education,
            interest,
            skills,
            timeCommitment,
            recommendedPath,
            roadmap
        });

        res.status(201).json(assessment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error processing assessment' });
    }
};

// @desc    Get the logged-in user's latest assessment
// @route   GET /api/assessments
// @access  Private
const getAssessment = async (req, res) => {
    try {
        // Find the most recent assessment for this specific user
        const assessment = await Assessment.findOne({ user: req.user.id }).sort({ createdAt: -1 });
        
        if (!assessment) {
            return res.status(404).json({ message: 'No assessment found' });
        }
        
        res.status(200).json(assessment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error retrieving assessment' });
    }
};

module.exports = { submitAssessment, getAssessment };