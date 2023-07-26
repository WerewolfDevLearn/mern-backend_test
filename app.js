const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express(); // web server

// add router from folder routes

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json(message);
});

module.exports = app;
