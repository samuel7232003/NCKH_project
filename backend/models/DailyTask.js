const mongoose = require('mongoose')

const dailyTaskSchema = mongoose.Schema({
    idUser: String,
    start: String,
    end: String,
    content: String,
    type: String,
    color: String
})

const dailyTaskModel = mongoose.model("DailyTask", dailyTaskSchema)
module.exports = dailyTaskModel