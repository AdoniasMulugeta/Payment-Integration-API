// importing custom modules
const clientModel = require("./client-model");

exports.getClientById  = async id    => await clientModel.findById(id);

exports.getClient      = async query => await clientModel.findOne(query);

exports.getClients     = async query => await clientModel.find(query);

exports.createClient   = async data  => await clientModel.create(data);

exports.updateClient   = async (id,data)  => await clientModel.findOneAndUpdate({_id: id},{$set:data},{new: true});

exports.removeClient   = async id  => await clientModel.findOneAndDelete({_id: id});


