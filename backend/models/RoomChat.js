const mongoose = require('mongoose')

const roomChatSchema = mongoose.Schema({
    name: String,
    avatar: String,
    lastMessage: String,
})

const roomChatModel = mongoose.model("RoomChat", roomChatSchema)
module.exports = roomChatModel