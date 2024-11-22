const express = require('express');
const { createUser, handleLogin, getProfile, getUser, editAccount, getUsersbyId, getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { getDiary, addDiary, removeDiary } = require('../controllers/diaryController');
const { getTask, addTask, removeTask } = require('../controllers/taskController');
const { getDailyTask, addDailyTask, removeDailyTask } = require('../controllers/dailyTaskController');
const { getMessages, addMessage, deleteRoom, updateRoom, getIdRoom, getRoomsByListId, getRoom } = require('../controllers/messageController');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json("hello would api");
})

routerAPI.post("/signup", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/profile", getProfile);
routerAPI.get("/account", getUser);
routerAPI.post("/editAccount", editAccount);
routerAPI.post("/getUsersById", getUsersbyId);
routerAPI.get("/getAllUser", getUsers);

routerAPI.get("/listDiary", getDiary);
routerAPI.post("/addDiary", addDiary);
routerAPI.post("/removeDiary", removeDiary);

routerAPI.get("/listTask", getTask);
routerAPI.post("/addTask", addTask);
routerAPI.get("/removeTask", removeTask);

routerAPI.get("/listDailyTask", getDailyTask);
routerAPI.post("/addDailyTask", addDailyTask);
routerAPI.get("/removeDailyTask", removeDailyTask);

routerAPI.get("/getMessages", getMessages);
routerAPI.post("/addMessage", addMessage);
routerAPI.get("/deleteRoom", deleteRoom);
routerAPI.post("/updateRoom", updateRoom);
routerAPI.get("/getIdRoom", getIdRoom);
routerAPI.post('/getRoomsByListId', getRoomsByListId);
routerAPI.get('/getRoomChat', getRoom);

module.exports = routerAPI;