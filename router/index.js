//importing custom modules
const userRouter = require("../app/user/user-router");
const authRouter = require("../app/auth/auth-router");

module.exports = app => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
};