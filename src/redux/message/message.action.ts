import { ThunkAction } from "redux-thunk";
import { messageSlice } from "./message.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { ListMessage, ListRoomChat, Message, RoomChat } from "./message.state";
import { getMessages, getRoomChat, sendMessageMess } from "../../service/messageService";
import { User } from "../user/user.state";
import { userActions } from "../user/user.action";
import { message } from "antd";

export const messageAction = messageSlice.actions;

export const getListRoomChat = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) =>{
        const respone = await getRoomChat(id);
        const listMess = respone.listMessage;
        const listRooms = respone.listRoom;
        const listUser = respone.listUser;
        let result = [... listRooms.map((index: RoomChat) => {
            if(index.name ===""){
                const id = listMess.find((mess: Message) => mess.roomId === index._id).content;
                const user:User = listUser.find((user: User) => user._id === id);
                return {...index, name: `${user.first_name} ${user.last_name}`, avatar: user.avatar};
            }
            else return index;
        })]
        const data:ListRoomChat = {idUser: id, roomChats: result};
        dispatch(messageAction.setListRoomChat(data));
        dispatch(userActions.setUserConnectList(listUser));
    }
}

export const getListMessage = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const respone:Message[] = await getMessages(id);
        const data:ListMessage = {idRoom: id, messages: respone};
        dispatch(messageAction.setListMessage(data));
    }
}

export const sendMessage = (message: Message) :ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const respone:Message[] = await sendMessageMess(message);
        const data:ListMessage = {idRoom: message.roomId, messages: respone};
        dispatch(messageAction.setListMessage(data));
    }
}