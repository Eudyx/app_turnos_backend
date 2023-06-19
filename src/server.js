require('dotenv').config();
const express = require('express');
const app = express();
const dbCon = require('./config/dbConnection');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

dbCon();

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', require('./routes/root'));
app.use('/users', require('./routes/user'));
app.use('/areas', require('./routes/area'));
app.use('/shifts', require('./routes/shift'));

module.exports = app;