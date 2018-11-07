//importing third-party modules
const Router = require("express").Router();
//importing custom modules
const userController = require("./user-controller");

//define http get request route
Router.get('/:id', userController.getUser);
Router.get('/', userController.getUsers);


module.exports = Router;
