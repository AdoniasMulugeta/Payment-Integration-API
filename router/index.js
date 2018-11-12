//importing custom modules
const userRouter = require("../app/user/user-router");
const walletRouter =

module.exports = app => {
    //validate token of any requests coming to this route
    app.use('/users', userRouter);
    app.use('wallet', wallerRouter);
};