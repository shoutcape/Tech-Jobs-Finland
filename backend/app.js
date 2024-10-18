const express = require('express');
const itduunitRouter = require('./routes/itduunit');

const app = express();
app.use(express.json())


app.use('/api/itduunit', itduunitRouter);

module.exports = app;
