import { Message, RoomChat } from "../redux/message/message.state";
import { User } from "../redux/user/user.state";
import { apiInstance } from "./api";

async function getIdRoom(id:string) :Promise<any>{
    try {
        const respone = await apiInstance.get(`/getIdRoom?id=${id}`);
        return respone;
    } catch (error) {
        throw(error);
    }
}

async function getRoomsByListId(listIdRoom:string[]) :Promise<any>{
    try {
        const res = await apiInstance.post('/getRoomsByListId/', listIdRoom);
        return res;
    } catch (error) {
        throw(error);
    }
}

async function getUsersById(listIdUser:string[]) :Promise<any>{
    try {
        const res_ = await apiInstance.post('/getUsersById', listIdUser);
        return res_;
    } catch (error) {
        throw(error);
    }
}

export async function getRoomChat(id:string) {
    try {
        const listMessage:Message[] = await getIdRoom(id);
        const listIdRoom:string[] = listMessage.map(index => index.roomId);
        const res:RoomChat[] = await getRoomsByListId(listIdRoom);
        const listIdUser:string[] = listMessage.filter(index => index.content!=="").map(index => index.content);
        const res_:User[] = await getUsersById(listIdUser);
        return {listRoom: res, listUser: res_, listMessage: listMessage};
    } catch (error) {
        throw(error);
    }
}

export async function getMessages(id:string) :Promise<any>{
    try {
        const respone= await apiInstance.get(`/getMessages?id=${id}`);
        return respone;
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

export async function deleteRoom(id:string):Promise<any> {
    try {
        const res = await apiInstance.get(`/deleteRoom?id=${id}`);
        return res;
    } catch (error) {
        throw(error);
    }
}

export async function updateRoom(room: RoomChat) {
    try {
        const res = await apiInstance.post("/updateRoom", room);
        return res;
    } catch (error) {
        throw(error)
    }
}

export async function getRoom(id:string):Promise<any> {
    try {
        const res = await apiInstance.get(`/getRoomChat?id=${id}`);
        return res;
    } catch (error) {
        throw(error)
    }
}
