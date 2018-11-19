// import third-party modules
const mongoose = require("mongoose");

// importing custom models
const CONFIG   = require("../../config");

// define the schema for the model
const FIModel = new mongoose.Schema({
    name        : { type : String, required: true},
    api_uri     : { type : String , required: true},
    api_uri_alt : { type : String , required: true},
    type        : { type : String, enum : CONFIG.FI_TYPES},
    address     : { type : String },
    enabled     : { type : Boolean, default: true},
    created_by  : { type : mongoose.ObjectId , ref : "user"},
    created_at  : { type : Date },
    updated_at  : { type : Date }
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
module.exports = mongoose.model("FI", FIModel);