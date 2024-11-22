const taskModel = require("../models/Task");

const getTasks = async(idUser) => {
    try {
        const query = {};
        if(idUser) query.idUser = idUser;
        const response = await taskModel.find(query);
        return response;
    } catch (error) {
        return null;
    }
}

const addTaskService = async(newTask) => {
    try{
        const response = await taskModel.create({
            idUser:newTask.idUser, 
            time:newTask.time, 
            date:newTask.date, 
            content:newTask.content, 
            type:newTask.type
        });
        return response;
    } catch(error){
        return null;
    }
}

const removeTaskService = async(id) => {
    try{
        const response = await taskModel.deleteOne({_id: id});
        return response;
    } catch(error){
        return null;
    }
}

module.exports = {
    getTasks, addTaskService, removeTaskService
}