const mongoose = require("mongoose");

const accountModel = new mongoose.Schema({
    wallet_id     : { type : mongoose.ObjectId, ref : "wallet"},
    transactions  : [{type : mongoose.ObjectId, ref : "transaction"}],
    created_at    : { type : Date , default: Date.now()},
    updated_at    : { type : Date , default: Date.now()}
});

// run this before every update
accountModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: { updated_at: new Date() } });
    next()
});

//expose the model to the outside scripts
exports = mongoose.model("account", accountModel);