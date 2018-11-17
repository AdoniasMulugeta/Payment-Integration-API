//importing custom modules
const userRouter     = require("../app/user/user-router");
const accountRouter  = require('../app/account/account-router');
const authController = require('../app/auth/auth-controller');


module.exports = app => {
    app.use('/users', userRouter);
    app.use('/accounts', authController.tokenValidator, accountRouter);
};