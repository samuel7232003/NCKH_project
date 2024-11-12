import { Message } from "../redux/message/message.state";
import { apiInstance } from "./api";

export async function getRoomChat(id:string) {
    try {
        const respone = await apiInstance.get(`/getRoom/${id}`);
        return respone.data;
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

export async function sendMessage(message:Message) {
    try {
        const respone = await apiInstance.post("/addMessage", message);
        return respone.data;
    } catch (error) {
        throw(error);
    }
}
