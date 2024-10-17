const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./route/index');
require('dotenv').config();
const cors = require('cors');
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => console.log('DB connection fail'));

app.listen(2000, () => {
  console.log('server on 2000');
});
