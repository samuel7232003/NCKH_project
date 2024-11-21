const express = require("express");
const connectDB = require('./db.js');
const accountModel = require("./models/Account.js")
const diaryModel = require("./models/Diary.js")
const cors = require('cors');
const taskModel = require("./models/Task.js");
const dailyTaskModel = require("./models/DailyTask.js");
const messageModel = require("./models/Message.js");
const roomChatModel = require("./models/RoomChat.js");
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json())

app.use(cors({
    origin: "*"
}))

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
}); 

connectDB()

const token = "token_login"


app.use((req, res, next) => {
    if(req.path !== "/login" && req.path !== "/signup" && req.get('authorization') !== token){
        return res.sendStatus(401)
    }
    next()
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const response = await accountModel.findOne({email, password});
    if(!response) return res.sendStatus(401)
    res.send({token, email})
})

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const role = "user";
    const base64Image = 'https://res.cloudinary.com/df7mhs6xj/image/upload/v1730885237/gvh57hvea5d1e5sjqjrx.png';
    const checkRes = await accountModel.findOne({email});
    if(checkRes) return res.json({message: "Email exited!"});
    else {
        try{
            const response = await accountModel.create({
                email: email,
                password: password,
                first_name: first_name, 
                last_name: last_name, 
                avatar: base64Image, 
                role: role});
            // res.send(token);
            return res.json({token, email});
        }
        catch(error){
            return res.json({message: "Signup fail!"})
        }
    }
})

app.get('/account/:email', async(req, res) =>{
    const email = req.params.email;
    const response = await accountModel.findOne({email});
    if(!response) return res.sendStatus(401);
    res.send(response);
})

app.get('/listDiary/:id', async(req, res) => {
    const idUser = req.params.id;
    const query = {};
    if(idUser) query.idUser = idUser;
    const response = await diaryModel.find(query);
    if(!response) return res.sendStatus(401);
    res.send(response);
})

app.post('/addDiary', async(req, res) =>{
    const idUser = req.body.idUser;
    const date = req.body.date;
    const survey = req.body.survey;
    const message = req.body.message;
    try{
        const response = await diaryModel.create({idUser, date, survey, message});
        return res.json({message: "Add success!"});
    } catch(error){
        return res.json({message: "Add faied!"});
    }
})

app.post('/removeDiary', async(req, res) => {
    const idUser = req.body.idUser;
    const date = req.body.date;
    try{
        const response = await diaryModel.deleteOne({idUser, date});
        return res.json({message: "Remove success!"});
    } catch(error){
        return res.json({message: "Remove fail!"});
    }
})

app.post('/editAccount', async(req, res) => {
    const newAcc = req.body;
    try{
        const response = await accountModel.replaceOne(
            {_id: newAcc._id},
            {
                first_name: newAcc.first_name,
                last_name: newAcc.last_name,
                birth: newAcc.birth,
                gender: newAcc.gender,
                email: newAcc.email,
                password: newAcc.password,
                avatar: newAcc.avatar,
                role: newAcc.role
            }
        )
    } catch(error){
        return res.json({message: "Seve fail!"});
    }
})

app.get('/listTask/:id', async(req, res) => {
    const idUser = req.params.id;
    const query = {};
    if(idUser) query.idUser = idUser;
    const response = await taskModel.find(query);
    if(!response) return res.sendStatus(401);
    res.send(response);
})

app.post('/addTask', async(req, res) =>{
    const idUser = req.body.idUser;
    const time = req.body.time;
    const date = req.body.date;
    const content = req.body.content;
    const type = req.body.type;
    try{
        const response = await taskModel.create({idUser, time, date, content, type});
        return res.json({message: "add success!"});
    } catch(error){
        return res.json({message: "Add faied!"});
    }
})

app.get('/removeTask/:id', async(req, res) => {
    const _id = req.params.id;
    try{
        const response = await taskModel.deleteOne({_id});
        return res.json({message: "Remove success!"});
    } catch(error){
        return res.json({message: "Remove fail!"});
    }
})

app.get('/listDailyTask/:id', async(req, res) => {
    const idUser = req.params.id;
    const query = {};
    if(idUser) query.idUser = idUser;
    const response = await dailyTaskModel.find(query);
    if(!response) return res.sendStatus(401);
    res.send(response);
})

app.post('/addDailyTask', async(req, res) =>{
    const idUser = req.body.idUser;
    const start = req.body.start;
    const end = req.body.end;
    const content = req.body.content;
    const type = req.body.type;
    const color = req.body.color
    try{
        const response = await dailyTaskModel.create({idUser, start, end, content, type, color});
        return res.json({message: "add success!"});
    } catch(error){
        return res.json({message: "Add faied!"});
    }
})

app.get('/removeDailyTask/:id', async(req, res) => {
    const _id = req.params.id;
    try{
        const response = await dailyTaskModel.deleteOne({_id});
        return res.json({message: "Remove success!"});
    } catch(error){
        return res.json({message: "Remove fail!"});
    }
})

app.get('/getIdRoom/:id', async(req, res) =>{
    const senderId = req.params.id;
    const query = {};
    if(senderId){
        query.type = "join"
        query.senderId = senderId;
    }
    try {
        const response = await messageModel.find(query);
        if(!response) res.status(401);
        res.send(response);
    } catch (error) {
        return res.json({message: "Get fail!"});
    }
})

app.post('/getRoomsByListId/', async(req, res) => {
    const listId = req.body;
    try {
        const response = await roomChatModel.find({_id: { $in: listId}});
        if(!response) res.status(401);
        res.send(response);
    } catch (error) {
        return res.json({message: "Get room fail!"});
    }
})

app.get('/getRoomChat/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const response = await roomChatModel.findOne({_id: id});
        if(!response) res.status(401);
        res.send(response);
    } catch (error) {
        return res.json({message: "Get room fail!"});
    }
})

app.post('/getUsersById', async(req, res) => {
    const listId = req.body;
    try {
        const uniUsers = [... new Set(listId)];
        const result = await accountModel.find({_id: { $in: uniUsers}});
        res.send(result);
    } catch (error) {
        return res.json({message: "Get users fail!"});
    }
})

app.get('/getAllUser', async(req, res) => {
    try {
        const response = await accountModel.find({role: "user"});
        res.send(response);
    } catch (error) {
        return res.json({message: "Get fail!"})
    }
})

const userSocketMap = {}

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
    console.log("New client connected " + socket.id);

    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;

    socketIo.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('join-room', (data) =>{
        for(let i = 0; i < data.length; i++){
            socket.join(data[i]._id);
        }
    })
  
    socket.on("send", (data) => {
        socket.to(data.roomId).emit("receive", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        delete userSocketMap[userId];
	    socketIo.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

app.post('/addMessage', async(req, res) => {
    const senderId = req.body.senderId;
    const roomId = req.body.roomId;
    const content = req.body.content;
    const type = req.body.type;
    const time = req.body.time;
    const name = "";
    const avatar = "";
    const isSeen = false;
    const lastMessage = "Đoạn chat mới được tạo!";
    try {
        if(type === "join"){
            const response = await roomChatModel.create({
                name: name, 
                avatar: avatar,
                lastMessage: lastMessage,
                isSeen: isSeen, 
                time: time, 
                lastSender: senderId 
            });
            const roomId_ = response._id;
            const response_ = await messageModel.create({senderId: senderId, roomId: roomId_, content: content, type:"join", time:time});
            if(content!=="") await messageModel.create({senderId: content, roomId: roomId_, content: senderId, type:"join", time:time});
            return res.send({roomId: roomId_});
        }
        else {
            const response = await messageModel.create({senderId:senderId, roomId: roomId, content: content, type: type, time: time});
            return res.send({roomId: roomId});
        }

    } catch (error) {
        return res.json({message: "Add fail!", error: error.message});
    }
})

app.get('/getMessages/:id', async (req, res) =>{
    const roomId = req.params.id;
    try {
        const response = await messageModel.find({roomId: roomId, type: { $in: ["message", "image"]}});
        res.send(response);
    } catch (error) {
        return res.json({message: "Get fail!"});
    }
})

app.get('/deleteRoom/:id', async(req, res) =>{
    const roomId = req.params.id;
    try {
        const response = await messageModel.deleteMany({roomId: roomId});
        const response_ = await roomChatModel.deleteOne({_id: roomId});
        return res.json({message: "Delete done!"});
    } catch(error){
        return res.json({message: "Delete fail!"});
    }
})

app.post('/updateRoom', async(req, res) => {
    const id = req.body._id;
    const time = req.body.time;
    const name = req.body.name;
    const avatar = req.body.avatar;
    const lastMessage = req.body.lastMessage;
    const isSeen = req.body.isSeen;
    const lastSender = req.body.lastSender;
    try {
        const response = await roomChatModel.replaceOne(
            {_id: id},
            {
                name: name,
                time: time,
                avatar: avatar,
                lastMessage: lastMessage,
                isSeen: isSeen,
                lastSender: lastSender
            }
        )

        return res.json({message: "Update done!"});
    } catch (error) {
        return res.json({message: "Update fail!"});
    }
})

server.listen(port, () =>{
    console.log("App is running2")
})
