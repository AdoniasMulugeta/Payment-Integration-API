// import third-party modules
const mongoose = require("mongoose");

// define the schema for the model 
const transactionModel = new mongoose.Schema({
    from_account : { type : mongoose.ObjectId, ref : "account", required: true},
    to_account   : { type : mongoose.ObjectId, ref : "account", required: true},
    Amount       : { type : Number, required : true},
    hash         : { type : String},
    created_at   : { type : Date }
});

// database hooks
// run this before every new record is saved
transactionModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    next()
});

//expose the model to the outside scripts
exports = mongoose.model("transaction", transactionModel);