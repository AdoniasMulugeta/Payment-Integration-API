//import custom modules
const accountDal = require("./account-dal");


exports.createAccount = async  (request, response) =>{
    try{
        request.body.balance = 0;
        request.body.client_id = request.client_id;
        const account = await accountDal.createAccount(request.body);
        sendSuccess(response, account)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getAccount = async  (request, response) =>{
    try{
        const account = await accountDal.getAccountById(request.params.account);
        sendSuccess(response, account)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getAccounts = async  (request, response) =>{
    try{
        const accounts = await accountDal.getAccounts({client_id : request.client_id});
        sendSuccess(response, accounts)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.updateAccount = async  (request, response) =>{
    try{
        const account = await accountDal.updateAccount(request.params.account, request.body);
        sendSuccess(response, account)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.removeAccount = async  (request, response) =>{
    try{
        const account = await accountDal.removeAccount(request.params.account);
        sendSuccess(response, account)
    }
    catch(error){
        sendError(response, error)
    }
};


exports.transfer = async  (request, response) =>{

};

exports.refund = async  (request, response) =>{

};

exports.getBalance = async  (request, response) =>{
    var balance = {balance: 200};
};

exports.searchAccounts = async  (request, response) =>{

};

exports.getTransactions = async  (request, response) =>{
    var a = 3;
};



//helper functions
function sendError(response, error) {
    response.status(500).json({
        type : "error",
        status: 500,
        errors  : [
            {
                type : "Internal Error",
                msg : error.msg || error.message,
            }
        ]
    })
}
function sendSuccess(response, data) {
    if(!data) data = [];
    else if(!Array.isArray(data)) data = [data];
    response.status(200).json({
        type: "success",
        status: 200,
        collection : "Accounts",
        data : data || []
    })
}