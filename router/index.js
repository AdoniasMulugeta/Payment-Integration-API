//importing custom modules
const userRouter = require("../app/user/user-router");
const authRouter = require("../app/auth/auth-router");
const authController  = require('../app/auth/auth-controller');

module.exports = app => {
    //validate token of any requests coming to this route
    app.use('/users', userRouter);
};