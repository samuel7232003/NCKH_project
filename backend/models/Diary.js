const mongoose = require('mongoose')

const diarySchema = mongoose.Schema({
    idUser: String,
    date: String,
    survey: Number,
    message: String
})

const diaryModel = mongoose.model("Diary", diarySchema)
module.exports = diaryModel