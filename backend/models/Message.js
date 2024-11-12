const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    senderId: String,
    roomId: String,
    content: String,
    type: String,
    time: String
})

const messageModel = mongoose.model("Message", messageSchema)
module.exports = messageModel