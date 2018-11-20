//importing custom modules
const userRouter     = require("../app/user/user-router");
const accountRouter  = require('../app/account/account-router');
const clientRouter   = require('../app/client/client-router');
const FIRouter       = require('../app/FI/FI-router');
const authController = require('../app/auth/auth-controller');
const accessControl  = require('../app/auth/access-control');


module.exports = app => {
    app.use('/users', userRouter);
    app.use('/accounts/:uid', authController.tokenValidator, accountRouter);
    app.use('/clients', authController.tokenValidator, clientRouter);
    app.use('/fi', authController.tokenValidator, accessControl.role.ADMIN, FIRouter);
};