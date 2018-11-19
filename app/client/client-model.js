// import third-party modules
const mongoose = require("mongoose");

// importing custom models
const CONFIG   = require("../../config");
const accountModel  = require('../account/account-model');


// define the schema for the model
const clientModel = new mongoose.Schema({
    full_name    : { type : String, required: true},
    phone_number : { type : Number, required: true},
    user_id      : { type : mongoose.ObjectId , ref : "user"},
    accounts     : [ accountModel ],
    enabled      : { type : Boolean, default: true},
    created_at   : { type : Date },
    updated_at   : { type : Date }
});

// database hooks
// run this before every new record is saved
clientModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every record is updated
clientModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: {
            updated_at: new Date().toISOString()
        }});
    next()
});

//expose the model to the outside scripts
module.exports = mongoose.model("client", clientModel);