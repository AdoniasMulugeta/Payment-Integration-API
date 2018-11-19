const mongoose = require("mongoose");

const accountModel = new mongoose.Schema({
    FID        : { type : mongoose.ObjectId , ref: "FI" },
    client_id  : { type : mongoose.ObjectId , ref: "client" },
    balance    : { type : Number},
    enabled    : { type : Boolean , default : true },
    created_at : { type : Date , default: Date.now()},
    updated_at : { type : Date , default: Date.now()}
});

// run this before every update
accountModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: { updated_at: new Date() } });
    next()
});

//expose the model to the outside scripts
module.exports = mongoose.model("account", accountModel);