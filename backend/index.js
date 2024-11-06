const express = require("express");
const connectDB = require('./db.js');
const accountModel = require("./models/Account.js")
const diaryModel = require("./models/Diary.js")
const cors = require('cors');
const taskModel = require("./models/Task.js");

const app = express()

app.use(express.json())

app.use(cors({
    origin: "*"
}))

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
    const base64Image = 'https://res.cloudinary.com/df7mhs6xj/image/upload/v1730885237/gvh57hvea5d1e5sjqjrx.png';
    const checkRes = await accountModel.findOne({email});
    if(checkRes) return res.json({message: "Email exited!"});
    else {
        try{
            const response = await accountModel.create({email, password, first_name, last_name, avatar: base64Image});
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
                avatar: newAcc.avatar
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

app.listen(3001, () => {
    console.log("App is running")
})
