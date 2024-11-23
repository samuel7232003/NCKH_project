const dailyTaskModel = require("../models/DailyTask");

const getDailyTasks = async(idUser) => {
    try {
        const query = {};
        if(idUser) query.idUser = idUser;
        const response = await dailyTaskModel.find(query);
        return response;
    } catch (error) {
        return null;
    }
}

const addDailyTasksService = async(newDailyTask) => {
    try {
        const response = await dailyTaskModel.create({
            idUser: newDailyTask.idUser,
            start: newDailyTask.start,
            end: newDailyTask.end,
            content: newDailyTask.content,
            type: newDailyTask.type,
            color: newDailyTask.color});
        return response;
    } catch (error) {
        return null;
    }
}

const removeDailyTaskService = async(id) => {
    try {
        const response = await dailyTaskModel.deleteOne({_id:id});
        return response;
    } catch (error) {
        return null
    }
}

module.exports = {
    getDailyTasks, addDailyTasksService, removeDailyTaskService
}