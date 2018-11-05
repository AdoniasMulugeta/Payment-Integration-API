const mongoose = require("mongoose");

const accountModel = new mongoose.Schema({
    wallet_id     : { type : mongoose.ObjectId, ref : "wallet"},
    transactions  : [{type : mongoose.ObjectId, ref : "transaction"}],
    created_at    : { type : Date },
    updated_at    : { type : Date }
});

// database hooks
// run this before every new record is saved
accountModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every update
accountModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: { updated_at: new Date() } });
    next()
});

//expose the model to the outside scripts
exports = mongoose.model("account", accountModel);