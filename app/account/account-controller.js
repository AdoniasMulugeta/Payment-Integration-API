//import custom modules
const accountDal = require("./account-dal");


exports.createAccount = async  (request, response) =>{
    const account = await accountDal.createAccount(request.body);
    account ? sendSuccess(response, account) :
        sendError(response, 500, 'Failed to create a new account')
};

exports.transfer = async  (request, response) =>{

};

exports.refund = async  (request, response) =>{

};

exports.getBalance = async  (request, response) =>{
    var balance = {balance: 200};
};

exports.getAccount = async  (request, response) =>{
    const account = await accountDal.getAccount(request.params.id);
    account ? sendSuccess(response, account) :
        sendError(response, 404, `account with id "${request.params.id}" doesn't exist.`)
};

exports.getAccounts = async  (request, response) =>{
    const accounts = await accountDal.getAccounts({});
    sendSuccess(response, accounts)
};

exports.updateAccount = async  (request, response) =>{
    const account = await accountDal.updateAccount(request.params.id);
    account ? sendSuccess(response, account) :
        sendError(response, 404, `account with id "${request.params.id}" doesn't exist.`)
};

exports.removeAccount = async  (request, response) =>{
    const account = await accountDal.removeAccount(request.params.id);
    account ? sendSuccess(response, account) :
        sendError(response, 500, "Failed to remove account");

};

exports.searchAccounts = async  (request, response) =>{

};

exports.getTransactions = async  (request, response) =>{
    var a = 3;
};



//helper functions
function sendError(response, status, error) {
    response.status(status).json({
        type : "error",
        status: status,
        collection : "Accounts",
        errors  : [
            {
                msg : error
            }
        ]
    })
}
function sendSuccess(response, data) {
    if(!Array.isArray(data)) data = [data];
    response.status(200).json({
        type: "success",
        status: 200,
        collection : "Accounts",
        data:data
    })
}