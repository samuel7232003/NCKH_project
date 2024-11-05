const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    idUser: String,
    time: String,
    date: String,
    content: String,
    type: String
})

const taskModel = mongoose.model("Task", taskSchema)
module.exports = taskModel