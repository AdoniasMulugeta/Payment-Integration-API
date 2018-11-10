//import third-party modules
const express          = require("express");
const bodyParser       = require("body-parser");
const expressValidator = require('express-validator');

//import custom modules
const database   = require('./database');
const config     = require('./config');
const router     = require('./router');
const server     = require('./server');

console.log(process.env.NODE_ENV)
//get handle of express app
const app = express();

//parse incoming request
app.use(bodyParser.json());

//run the express-validator
app.use(expressValidator());

// connect to database
database.connect();

//call the central router
router(app);

//start HTTP server
server.start(app);

//expose express app for testing purposes
module.exports = app;