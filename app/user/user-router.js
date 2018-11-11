//importing third-party modules
const router = require("express").Router();
//importing custom modules
const userController = require("./user-controller");
const authController = require('../auth/auth-controller');
const authValidator  = require("../auth/auth-validator");

//define http get request route
router.get   ('/', userController.getUsers);
router.get   ('/:id', userController.getUser);
router.post  ('/signup', authValidator.signUp, authValidator.errorHandler, authController.signUp);
router.post  ('/login', authValidator.logIn, authValidator.errorHandler, authController.logIn);
router.put   ('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
