const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
});

//we dont need to define schema for username and pass plugin func automaticaly define that for us
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);