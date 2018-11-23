// importing custom modules
const accountModel = require("./account-model");


exports.createAccount   = async data  => await accountModel.create(data);

exports.getAccountById  = async id    => await accountModel.findById(id).where('enabled').equals(true);

exports.getAccount      = async query => await accountModel.findOne(query).where('enabled').equals(true);

exports.getAccounts     = async query => await accountModel.find(query).where('enabled').equals(true);

exports.updateAccount   = async (id,data)  => await accountModel.findOneAndUpdate({_id: id},{$set:data},{new: true}).where('enabled').equals(true);

exports.removeAccount   = async id    => await accountModel.findOneAndUpdate({_id: id}, {enabled: false}).where('enabled').equals(true);


