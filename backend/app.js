const express = require('express');
const itduunitRouter = require('./routes/itduunit');
const path = require('path')

const app = express();
app.use(express.json())


app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/itduunit', itduunitRouter);

module.exports = app;
