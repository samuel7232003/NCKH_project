const { getDiarys, addDiaryService, removeDiaryService } = require("../services/diaryService");

const getDiary = async(req, res) =>{
    const {id} = req.query;
    const data = await getDiarys(id);
    return res.status(200).json(data);
}

const addDiary = async(req, res) => {
    const diary = req.body;
    const data = await addDiaryService(diary);
    return res.status(200).json(data);
}

const removeDiary = async(req, res) => {
    const {idUser, date} = req.body;
    const data = await removeDiaryService(idUser, date);
    return res.status(200).json(data);
}

module.exports = {
    getDiary, addDiary, removeDiary
}