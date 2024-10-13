const express = require("express");
const connectDB = require('./db.js');
const accountModel = require("./models/Account.js")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.use((req, res, next) => {
    if(req.path !== "/login" && req.get('authorization') !== token){
        return res.sendStatus(401)
    }
    next()
})

const token = "token_login"

app.get("/account", async (req, res)=>{
    const response = await accountModel.find()
    return res.json({items: response})
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const response = await accountModel.findOne({email, password});
    if(!response) return res.sendStatus(401)
    res.send(token)
})

app.listen(3001, () => {
    console.log("App is running")
})

