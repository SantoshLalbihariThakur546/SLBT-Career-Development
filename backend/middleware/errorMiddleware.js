const errorHandler = (err, req, res, next) => {
    // If a controller already set a status code, use it. Otherwise, default to 500 (Server Error).
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Only show the detailed stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };