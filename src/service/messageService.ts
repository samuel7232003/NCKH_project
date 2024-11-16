import { Message, RoomChat } from "../redux/message/message.state";
import { apiInstance } from "./api";

export async function getRoomChat(id:string) {
    try {
        const respone = await apiInstance.get(`/getIdRoom/${id}`);
        const listMessage:Message[] = respone.data;
        const listIdRoom:String[] = listMessage.map(index => index.roomId);
        const res = await apiInstance.post('/getRoomsByListId/', listIdRoom);
        const listIdUser = listMessage.filter(index => index.content!=="").map(index => index.content);
        const res_ = await apiInstance.post('/getUsersById', listIdUser);
        return {listRoom: res.data, listUser: res_.data, listMessage: respone.data};
    } catch (error) {
        throw(error);
    }
}

export async function getMessages(id:string) {
    try {
        const respone= await apiInstance.get(`/getMessages/${id}`);
        return respone.data;
    } catch (error) {
        throw(error);
    }
}

export async function sendMessageMess(message:Message) {
    try {
        const respone = await apiInstance.post("/addMessage", message);
        return respone;
    } catch (error) {
        throw(error);
    }
}

export async function deleteRoom(id:string) {
    try {
        const res = await apiInstance.get(`/deleteRoom/${id}`);
        return res.data.message;
    } catch (error) {
        throw(error);
    }
}

export async function updateRoom(room: RoomChat) {
    try {
        const res = await apiInstance.post("/updateRoom", room);
        return res.data;
    } catch (error) {
        throw(error)
    }
}

export async function getRoom(id:string) {
    try {
        const res = await apiInstance.get(`/getRoomChat/${id}`);
        return res.data;
    } catch (error) {
        throw(error)
    }
}
