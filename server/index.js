// import custom modules
const CONFIG = require('../config');

exports.start = function (app){
    app.listen(CONFIG.SERVER_PORT,()=>{console.log('app Running on Port',CONFIG.SERVER_PORT)});
};