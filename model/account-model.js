const mongoose = require("mongoose");

const accountModel = new mongoose.Schema({
    user       : { type : mongoose.ObjectId, ref : "User"},
    media      : { type : mongoose.ObjectId, ref: "Media"},
    created_at : { type : Date },
    updated_at : { type : Date }
});