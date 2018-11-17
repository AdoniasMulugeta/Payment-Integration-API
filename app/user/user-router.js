//importing third-party modules
const router = require("express").Router();
//importing custom modules
const userController = require("./user-controller");
const userValidator  = require("./user-validation");
const authController = require("../auth/auth-controller");
const authValidator  = require("../auth/auth-validator");

//define http get request route

router.get   ('/',       userController.getUsers);
router.get   ('/:id',    userController.getUser);
router.post  ('/signup', authValidator.signUp, authValidator.errorHandler, authController.signUp);
router.post  ('/login',  authValidator.logIn, authValidator.errorHandler, authController.logIn);
router.put   ('/:id',    authController.tokenValidator, userValidator.update, userValidator.errorHandler ,userController.updateUser);
router.delete('/:id',    authController.tokenValidator,userController.removeUser);

module.exports = router;
