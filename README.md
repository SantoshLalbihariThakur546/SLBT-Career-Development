# 🚀 SLBT Career Development Platform

A comprehensive, AI-driven career guidance and consultation platform designed to assess student profiles, generate personalized preparation roadmaps, and facilitate counselor appointments.

## 🌟 Key Features
* **Role-Based Access Control (RBAC):** Secure JWT authentication isolating Student, Counselor, and Admin workflows.
* **AI Career Assistant:** Integrates Google Gemini LLM to synthesize user inputs (education, skills, interests) into structured, phase-by-phase career roadmaps.
* **Consultation Management:** End-to-end appointment booking and status tracking pipeline for career counselors.
* **Interactive Dashboards:** Real-time progress tracking, task management, and mock test scheduling for students.

## 🛠️ Technology Stack
* **Frontend:** React.js, Tailwind CSS, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose
* **AI Integration:** Google Generative AI (Gemini Flash)
* **Security:** bcryptjs (password hashing), JSON Web Tokens (session management)

## ⚙️ Local Setup Instructions
1. Clone the repository: `git clone https://github.com/YourUsername/SLBT-Career-Development.git`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd ../backend && npm install`
4. Create a `.env` file in the backend directory with:
   * `MONGO_URI`
   * `JWT_SECRET`
   * `GEMINI_API_KEY`
   * `PORT=5000`
5. Start the development servers:
   * Backend: `npm run dev`
   * Frontend: `npm run dev`
