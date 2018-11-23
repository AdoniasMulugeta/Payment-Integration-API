// importing custom modules
const userModel = require("./user-model");

exports.getUserById  = async id    => await userModel.findById(id,"-password").where('enabled').equals(true);

exports.getUser      = async query => await userModel.findOne(query).where('enabled').equals(true);

exports.getUsers     = async query => await userModel.find(query).where('enabled').equals(true);

exports.createUser   = async data  => await userModel.create(data);

exports.updateUser   = async (id,data)  => await userModel.findOneAndUpdate({_id: id},{$set:data},{new: true}).where('enabled').equals(true);;

exports.removeUser   = async id  => await userModel.findOneAndUpdate({_id: id}, {enabled: false});

exports.getUserWithPassword  = async query => await userModel.findOne(query).select('+password').where('enabled').equals(true);


