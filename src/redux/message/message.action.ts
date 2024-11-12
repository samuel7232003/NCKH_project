import { ThunkAction } from "redux-thunk";
import { messageSlice } from "./message.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { ListMessage, ListRoomChat, Message, RoomChat } from "./message.state";
import { getMessages, getRoomChat } from "../../service/messageService";

export const messageAction = messageSlice.actions;

export const getListRoomChat = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) =>{
        const respone:RoomChat[] = await getRoomChat(id);
        const data:ListRoomChat = {idUser: id, roomChats: respone};
        dispatch(messageAction.setListRoomChat(data));
    }
}

export const getListMessage = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const respone:Message[] = await getMessages(id);
        const data:ListMessage = {idRoom: id, messages: respone};
        dispatch(messageAction.setListMessage(data));
    }
}