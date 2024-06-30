const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobilenum: Number
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;