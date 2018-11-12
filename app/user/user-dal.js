// importing custom modules
const userModel = require("./user-model");

exports.getUserById  = async id    => await userModel.findById(id);

exports.getUser      = async query => await userModel.findOne(query);

exports.getUsers     = async query => await userModel.find(query);

exports.createUser   = async data  => await userModel.create(data);

exports.updateUser   = async (id,data)  => await userModel.findOneAndUpdate({_id: id},{$set:data},{new: true});

exports.removeUser   = async id  => await userModel.findOneAndDelete({_id: id});


