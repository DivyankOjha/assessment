const converter = require('json-2-csv');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const testRouter = require('./routes/testRoute');

// const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
});
//  MIDDLEWARES

app.use(bodyParser.json({ limit: '50mb' }));

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 5000,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

app.use('/api/test', testRouter);

// app.use(globalErrorHandler);

module.exports = app;
