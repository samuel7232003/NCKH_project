require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
}); 

//config cors
app.use(cors());

//config req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//config template engine
configViewEngine(app);

const webAPI = express.Router();

app.use('/', webAPI);

app.use('/api/v1', apiRoutes);

const userSocketMap = {}

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
    const userId = socket.handshake.query.userId;

    if (userId !== "undefined") userSocketMap[userId] = socket.id;

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

(async () => {
    try {
        await connection();

        server.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect tp DB: ", error)
    }
})()