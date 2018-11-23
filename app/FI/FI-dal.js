// importing custom modules
const FIModel = require("./FI-model");

exports.getFIById  = async id    => await FIModel.findById(id).where('enabled').equals(true);

exports.getFI      = async query => await FIModel.findOne(query).where('enabled').equals(true);

exports.getFIs     = async query => await FIModel.find(query).where('enabled').equals(true);

exports.createFI   = async data  => await FIModel.create(data);

exports.updateFI   = async (id,data)  => await FIModel.findOneAndUpdate({_id: id},{$set:data},{new: true}).where('enabled').equals(true);

exports.removeFI   = async id  => await FIModel.findOneAndUpdate({_id: id}, {enabled: false}).where('enabled').equals(true);


