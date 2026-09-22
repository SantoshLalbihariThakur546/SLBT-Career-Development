const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getCareerRoadmap = async (req, res) => {
    try {
        const { education, interest, goal, time, skills } = req.body;

        if (!education || !goal) {
            return res.status(400).json({ success: false, message: 'Education and Goal are required.' });
        }

        // Use the fast and cost-effective Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are the AI Career Assistant for "SLBT Career Development". 
        A student has provided the following profile:
        - Current Education: ${education}
        - Career Interests: ${interest}
        - Primary Goal: ${goal}
        - Preparation Time Available: ${time}
        - Current Skills: ${skills}

        Based on this, generate a personalized career roadmap. 
        Structure your response clearly with:
        1. A brief encouraging profile summary.
        2. 2-3 Possible Career Paths related to their goal.
        3. A structured, step-by-step preparation plan (Month-by-Month or Phase-by-Phase).
        
        Keep the tone professional, motivating, and actionable. Do not use overly complex formatting, just clean text with bullet points.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ success: true, data: text });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ success: false, message: 'Failed to generate AI roadmap. Please try again later.' });
    }
};

module.exports = { getCareerRoadmap };