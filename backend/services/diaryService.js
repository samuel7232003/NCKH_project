const diaryModel = require("../models/Diary");

const getDiarys = async(idUser) => {
    try {
        const query = {};
        if(idUser) query.idUser = idUser;
        const response = await diaryModel.find(query);
        return response;
    } catch (error) {
        return null;
    }
}

const addDiaryService = async(diary) => {
    try{
        const response = await diaryModel.create({
            idUser:diary.idUser, 
            date:diary.date, 
            survey:diary.survey, 
            message:diary.message
        });
        return response;
    } catch(error){
        return null
    }
}

const removeDiaryService = async(idUser, date) =>{
    try{
        const response = await diaryModel.deleteOne({idUser, date});
        return response
    } catch(error){
        return null
    }
}

module.exports = {
    getDiarys, addDiaryService, removeDiaryService
}