const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Database Connection
const connectDB = require('./config/db');

// Import Error Handler Middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// ==========================================
// STANDARD MIDDLEWARE
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==========================================
// API ROUTES
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/assessments', require('./routes/assessmentRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/preparation', require('./routes/preparationRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('SLBT Career Development API is active.');
});

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================
// This MUST be the last middleware mounted, strictly below all routes.
app.use(errorHandler);

// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});