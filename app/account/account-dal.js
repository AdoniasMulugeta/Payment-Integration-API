// importing custom modules
const accountModel = require("./account-model");

exports.createAccount   = async data  => {return await accountModel.create(data)};

exports.getAccountById  = async id    => await accountModel.findById(id);

exports.getAccount      = async query => await accountModel.findOne(query);

exports.getAccounts     = async query => await accountModel.find(query);

exports.createAccount   = async data  => await accountModel.create(data);

exports.updateAccount   = async (id,data)  => await accountModel.findOneAndUpdate({_id: id},{$set:data},{new: true});

exports.removeAccount   = async id    => await accountModel.findOneAndDelete({_id: id});


