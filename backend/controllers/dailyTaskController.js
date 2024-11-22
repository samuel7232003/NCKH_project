const { removeDailyTaskService } = require("../services/dailyTaskService");
const { addDailyTasksService } = require("../services/dailyTaskService");
const { getDailyTasks } = require("../services/dailyTaskService");

const getDailyTask = async(req, res) =>{
    const {id} = req.query;

    const data = await getDailyTasks(id);
    return res.status(200).json(data);
}

const addDailyTask = async(req, res) => {
    const dailyTask = req.body;
    const data = await addDailyTasksService(dailyTask);
    return res.status(200).json(data);
}

const removeDailyTask = async(req, res) => {
    const {id} = req.query;
    const data = await removeDailyTaskService(id);
    return res.status(200).json(data);
}

module.exports = {
    getDailyTask, addDailyTask, removeDailyTask
}