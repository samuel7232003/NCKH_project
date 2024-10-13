const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String
})

const accountModel = mongoose.model("Account", accountSchema)
module.exports = accountModel