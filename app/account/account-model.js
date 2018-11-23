const mongoose = require("mongoose");

const accountModel = new mongoose.Schema({
    fi_id      : { type : mongoose.ObjectId , ref: "FI", required: true},
    client_id  : { type : mongoose.ObjectId , ref: "client" , required: true},
    balance    : { type : Number, required: true},
    enabled    : { type : Boolean , default : true, required: true },
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
exports.schema = accountModel;