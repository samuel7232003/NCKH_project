const { addMessageService, getMessageService, deleteRoomService, updateRoomService, getIdRoomService, getRoomsByListIdService, getRoomService } = require("../services/messageService");

const addMessage = async(req, res)=>{
    const newMessage = req.body;

    const data = await addMessageService(newMessage);
    return res.status(200).json(data);
}

const getMessages = async(req, res)=>{
    const {id} = req.query;

    const data = await getMessageService(id);
    return res.status(200).json(data);
}

const deleteRoom = async(req, res)=>{
    const {id} = req.query;

    const data = await deleteRoomService(id);
    return res.status(200).json(data);
}

const updateRoom = async (req, res)=>{
    const newRoom = req.body;

    const data = await updateRoomService(newRoom);
    return res.status(200).json(data);
}

const getIdRoom = async (req, res)=>{
    const {id} = req.query;

    const data = await getIdRoomService(id);
    return res.status(200).json(data);
}

const getRoomsByListId = async(req, res)=>{
    const listId = req.body;

    const data = await getRoomsByListIdService(listId);
    return res.status(200).json(data);
}

const getRoom = async(req, res)=>{
    const {id} = req.query;

    const data = await getRoomService(id);
    return res.status(200).json(data);
}

module.exports = {
    addMessage, getMessages, deleteRoom, updateRoom, getIdRoom, getRoomsByListId, getRoom
}