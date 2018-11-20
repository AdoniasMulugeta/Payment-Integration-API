// importing custom modules
const transactionModel = require("./transaction-model");

exports.getTransactionById  = async id    => await transactionModel.findById(id,"-password");

exports.getTransaction      = async query => await transactionModel.findOne(query);

exports.getTransactions     = async query => await transactionModel.find(query);

exports.createTransaction   = async data  => await transactionModel.create(data);


