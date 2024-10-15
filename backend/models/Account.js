const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    avatar: String
})

const accountModel = mongoose.model("Account", accountSchema)
module.exports = accountModel