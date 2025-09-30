// api/index.cjs
const express = require('express');
const app = express();

// Handlers and Middleware
const signupHandler = require('./auth/signup.cjs');
const authMiddleware = require('./authMiddleware.cjs');
const meetingsHandler = require('./meetings/index.cjs');

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello from the REC CORE API!');
});

// Public route
app.post('/api/auth/signup', signupHandler);

// Protected route
app.get('/api/meetings', authMiddleware, meetingsHandler);

module.exports = app;
