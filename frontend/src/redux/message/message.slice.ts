import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListMessage, ListRoomChat, MessageModel } from "./message.state";

export const initalMessageState:MessageModel ={
    listMessage: {
        idRoom:"",
        messages: []
    },
    listRoomChat:{
        idUser: "",
        roomChats: []
    }
}

export const messageSlice = createSlice({
    name: "message",
    initialState: initalMessageState,
    reducers: {
        setListMessage(state, action: PayloadAction<ListMessage>){
            state.listMessage = action.payload;
        },
        setListRoomChat(state, action: PayloadAction<ListRoomChat>){
            state.listRoomChat = action.payload;
        }
    }
})