// importing custom modules
const FIModel = require("./FI-model");

exports.getFIById  = async id    => await FIModel.findById(id);

exports.getFI      = async query => await FIModel.findOne(query);

exports.getFIs     = async query => await FIModel.find(query);

exports.createFI   = async data  => await FIModel.create(data);

exports.updateFI   = async (id,data)  => await FIModel.findOneAndUpdate({_id: id},{$set:data},{new: true});

exports.removeFI   = async id  => await FIModel.findOneAndDelete({_id: id});


