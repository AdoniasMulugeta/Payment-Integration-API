//importing third-party modules
const Router = require("express").Router();
//importing custom modules
const authController = require("./auth-controller");
const authValidator  = require("./auth-validator");


//define http get request route
Router.post('/signUp', authValidator.signUp, authValidator.errorHandler, authController.signUp);
Router.post('/login', authValidator.logIn, authValidator.errorHandler ,authController.logIn);

module.exports = Router;
