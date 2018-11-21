// import third-party modules
const mongoose = require("mongoose");

// importing custom models
const CONFIG   = require("../../config");

// define the schema for the model
const FIModel = new mongoose.Schema({
    name        : { type : String, required: true},
    api         : { type : String , required: true},
    api_alt     : { type : String },
    type        : { type : String, enum : CONFIG.FI_TYPES},
    address     : { type : String },
    enabled     : { type : Boolean, default: true, required: true},
    created_by  : { type : mongoose.ObjectId , ref : "FI", required: true},
    created_at  : { type : Date },
    updated_at  : { type : Date }
});

// database hooks
// run this before every new record is saved
FIModel.pre('save', function (next) {
    let now = (new Date()).toISOString();
    this.created_at = now;
    this.updated_at = now;
    next()
});

// run this before every record is updated
FIModel.pre('findOneAndUpdate', function(next){
    this.update({},{ $set: {
            updated_at: new Date().toISOString()
        }});
    next()
});

//expose the model to the outside scripts
module.exports = mongoose.model("FI", FIModel);