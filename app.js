// import third-party modules
const express          = require("express");
const bodyParser       = require("body-parser");

// import custom modules
const database   = require('./database');
const config     = require('./config');
const router     = require('./router');
const server     = require('./server');

// get handle variable for express app
const app = express()

// connect to database
database.mongoose.connect();