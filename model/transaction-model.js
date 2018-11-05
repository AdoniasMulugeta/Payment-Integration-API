// import third-party modules
const mongoose = require("mongoose");

// define the schema for the model 
const transactionModel = new mongoose.Schema({
    from_wallet      : { type : mongoose.ObjectId, ref : "wallet", required: true},
    to_wallet        : { type : mongoose.ObjectId, ref : "wallet", required: true},
    transaction_date : { type : Date },
    created_at       : { type : Date },
    updated_at       : { type : Date }
});

// database hooks
// run this before every new record is saved
transactionModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every update
transactionModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: { updated_at: new Date() } });
    next()
});

//expose the model to the outside scripts
exports = mongoose.model("transaction", transactionModel);