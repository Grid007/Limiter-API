// index.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

// Create a rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter middleware to all API routes
app.use('/api/', apiLimiter);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API Rate Limiter!');
});

// API route example
app.get('/api/data', (req, res) => {
  res.send('This is some data from the API.');
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export the app for testing
