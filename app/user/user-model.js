// import third-party modules
const mongoose = require("mongoose");

// importing custom models
const CONFIG   = require("../../config");

// define the schema for the model
const userModel = new mongoose.Schema({
    email      : { type : String, required: true},
    password   : { type : String, required: true, select: false},
    role       : { type : String, enum : CONFIG.ROLES, default: CONFIG.DEFAULT_ROLE},
    Client_ID  : { type : mongoose.ObjectId , ref : "client"},
    enabled    : { type : Boolean, default: true},
    created_at : { type : Date },
    updated_at : { type : Date }
});

// database hooks
// run this before every new record is saved
userModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every record is updated
userModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: {
        updated_at: new Date().toISOString()
    }});
    next()
});

//expose the model to the outside scripts
module.exports = mongoose.model("user", userModel);