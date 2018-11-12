// import third-party modules
const mongoose = require("mongoose");

// define the schema for the model
const walletModel = new mongoose.Schema({
    user_id          : { type : mongoose.ObjectId, ref : "user", required: true},
    accounts         : [{type : mongoose.ObjectId, ref : "account"}],
    created_at       : { type : Date },
    updated_at       : { type : Date }
});

// database hooks
// run this before every new record is saved
walletModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every update
walletModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: { updated_at: new Date() } });
    next()
});

//expose the model to the outside scripts
exports = mongoose.model("wallet", walletModel);