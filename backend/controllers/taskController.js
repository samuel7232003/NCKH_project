const { getTasks, addTaskService, removeTaskService } = require("../services/taskService");


const getTask = async(req, res) =>{
    const {id} = req.query;

    const data = await getTasks(id);
    return res.status(200).json(data);
}

const addTask = async(req, res) =>{
    const newTask = req.body;

    const data = await addTaskService(newTask);
    return res.status(200).json(data);
}

const removeTask = async(req, res) =>{
    const {id} = req.query;

    const data = await removeTaskService(id);
    return res.status(200).json(data);
}

module.exports = {
    getTask, addTask, removeTask
}