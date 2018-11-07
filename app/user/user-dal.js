// importing custom modules
const userModel = require("./user-model");

exports.getById    = async id    => await userModel.findById(id);

exports.getUser    = async query => await userModel.findOne(query);

exports.getUsers   = async query => await userModel.find(query);

exports.createUser = async data  => await userModel.create(data);

exports.removeUser = async data  => await userModel.find({data});


