//import custom modules
const CONFIG = require("../../config");
const transactionDal = require("./transaction-dal");
const bcrypt = require('bcryptjs');

exports.getRole = async id => {
    const transaction = await transactionDal.getTransaction(id);
    return transaction.role || CONFIG.DEFAULT_ROLE;
};

exports.getTransaction = async (request, response)=>{
    try{
        const transaction = await transactionDal.getTransactionById(request.params.id);
        sendSuccess(response, transaction)
    }
    catch(error){
        sendError(response, error)
    }
};

exports.getTransactions = async (request, response)=>{
    try{
        const transactions = await transactionDal.getTransactions(request.body);
        sendSuccess(response, transactions)
    }
    catch(error){
        sendError(response, error)
    }
};


//helper functions
function sendError(response, error) {
    response.status(500).json({
        type : "error",
        status: 500,
        errors  : [
            {
                type : "internal server error",
                msg : "failed to execute operation: "+error.msg,
                action : action,

            }
        ]
    })
}
function sendSuccess(response, data) {
    if(!Array.isArray(data)) data = [data];
    response.status(200).json({
        type: "success",
        status: 200,
        data:data
    })
}