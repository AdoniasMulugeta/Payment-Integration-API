//importing custom modules
const userRouter = require("../app/user/user-router");
const authRouter = require("../app/auth/auth-router");
const auth       = require('../app/auth/auth-controller');

module.exports = app => {
    app.use('/users', userRouter);
};