// app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// Estado inicial vazio
let accounts = {};

app.use('/', routes);

module.exports = app;
