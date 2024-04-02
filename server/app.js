const express = require('express');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const matchReqestRoutes = require('./routes/matchRequestRoutes');
const matchRoutes = require('./routes/matchRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/matchRequest', matchReqestRoutes);
app.use('/api/matches', matchRoutes);

module.exports = app;