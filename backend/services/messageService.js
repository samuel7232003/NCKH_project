const messageModel = require("../models/Message");
const roomChatModel = require("../models/RoomChat");

const addMessageService = async(newMessage) => {
    const senderId = newMessage.senderId;
    const roomId = newMessage.roomId;
    const content = newMessage.content;
    const type = newMessage.type;
    const time = newMessage.time;
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
            await messageModel.create({senderId: senderId, roomId: roomId_, content: content, type:"join", time:time});
            if(content!=="") await messageModel.create({senderId: content, roomId: roomId_, content: senderId, type:"join", time:time});
            return {roomId: roomId_};
        }
        else {
            await messageModel.create({senderId:senderId, roomId: roomId, content: content, type: type, time: time});
            return {roomId: roomId};
        }

    } catch (error) {
        return null;
    }
}

const getMessageService = async(id)=>{
    try {
        const response = await messageModel.find({roomId: id, type: { $in: ["message", "image"]}});
        return response;
    } catch (error) {
        return null;
    }
}

const deleteRoomService = async(id)=>{
    try {
        await messageModel.deleteMany({roomId: id});
        const response_ = await roomChatModel.deleteOne({_id: id});
        return response_
    } catch(error){
        return null;
    }
}

const updateRoomService = async (newRoom)=>{
    try {
        const response = await roomChatModel.replaceOne(
            {_id: newRoom.id},
            {
                name: newRoom.name,
                time: newRoom.time,
                avatar: newRoom.avatar,
                lastMessage: newRoom.lastMessage,
                isSeen: newRoom.isSeen,
                lastSender: newRoom.lastSender
            }
        )

        return response;
    } catch (error) {
        return null;
    }
}

const getIdRoomService = async (senderId)=>{
    const query = {};
    if(senderId){
        query.type = "join"
        query.senderId = senderId;
    }
    try {
        const response = await messageModel.find(query);
        return response;
    } catch (error) {
        return null
    }
}

const getRoomsByListIdService = async (listId)=>{
    try {
        const response = await roomChatModel.find({_id: { $in: listId}});
        return response;
    } catch (error) {
        return null;
    }
}

const getRoomService = async(id)=>{
    try {
        const response = await roomChatModel.findOne({_id: id});
        return response;
    } catch (error) {
        return null;
    }
}

module.exports = {
    addMessageService, getMessageService, deleteRoomService, updateRoomService, getIdRoomService, getRoomsByListIdService, getRoomService
}