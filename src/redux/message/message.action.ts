import { ThunkAction } from "redux-thunk";
import { messageSlice } from "./message.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { ListMessage, ListRoomChat, Message, RoomChat } from "./message.state";
import { deleteRoom, getMessages, getRoom, getRoomChat, sendMessageMess, updateRoom } from "../../service/messageService";
import { User } from "../user/user.state";
import { userActions } from "../user/user.action";
import dayjs from "dayjs";

export const messageAction = messageSlice.actions;

export const getListRoomChat = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) =>{
        const respone = await getRoomChat(id);
        const listMess = respone.listMessage;
        const listRooms = respone.listRoom;
        const listUser = respone.listUser;
        let result = [... listRooms.map((index: RoomChat) => {
            const id = listMess.find((mess: Message) => mess.roomId === index._id).content;
            const user:User = listUser.find((user: User) => user._id === id);
            const lastSender :string = (index.lastSender !== id) ?"Bạn" :user.last_name;
            if(index.name ===""){
                return {...index, name: `${user.first_name} ${user.last_name}`, avatar: user.avatar, lastSender: lastSender};
            }
            else return {...index, lastSender: lastSender};
        })]

        const sortedData = result.sort((a, b) => {
            const dateA = dayjs(a.time, 'HH:mm, DD/MM');
            const dateB = dayjs(b.time, 'HH:mm, DD/MM');
            return dateA.isBefore(dateB) ? 1 : -1; // Sắp xếp theo thứ tự tăng dần
        });

        const data:ListRoomChat = {idUser: id, roomChats: sortedData};
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
        const respone = await sendMessageMess(message);
        const respone_ = await getMessages(message.roomId);
        const data:ListMessage = {idRoom: message.roomId, messages: respone_};
        dispatch(messageAction.setListMessage(data));


        if(message.type !== "join"){
            const res = await getRoom(message.roomId);
            if(res){
                const newRoom:RoomChat = {...res, time: message.time, lastMessage: message.content, lastSender: message.senderId};
                let lastSender="";
                if(message.senderId === getState().user.user._id) lastSender = "Bạn";
                else {
                    const user = getState().user.userConnectList.find((index:User) => index._id === message._id);
                    if(user) lastSender = user.last_name;
                }
                const res_ = await updateRoom(newRoom);
                const oldList = getState().message.listRoomChat.roomChats;
                const newList = [...oldList.map((index:RoomChat) => {
                    if(index._id === newRoom._id) return {...newRoom, avatar:index.avatar, name: index.name, lastSender: lastSender};
                    else return index;
                })]

                const sortedData = newList.sort((a, b) => {
                    const dateA = dayjs(a.time, 'HH:mm, DD/MM');
                    const dateB = dayjs(b.time, 'HH:mm, DD/MM');
                    return dateA.isBefore(dateB) ? 1 : -1; // Sắp xếp theo thứ tự tăng dần
                });

                const result: ListRoomChat = {idUser: message.senderId, roomChats: sortedData};
                dispatch(messageAction.setListRoomChat(result));
            }
        }
    }
}

export const openNewChat = (senderId: string, roomId: string) :ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const time = dayjs().format("HH:mm, DD/MM");
        const message: Message = {_id: "", senderId: senderId, roomId: "", content: roomId, type: "join", time:time};
        const respone = await sendMessageMess(message);
    }
}

export const removeRoomChat = (roomId :string, id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const res = await deleteRoom(roomId);

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

export const setMessages = (listMessage:Message[]):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const list:ListMessage = {idRoom: listMessage[0].roomId, messages: listMessage}; 
        await dispatch(messageAction.setListMessage(list));
    }
}

export const setListRoom = (message:Message):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{
        const user = getState().user.user;
        let lastSender = "";
        if(user._id === message.senderId) lastSender = "Bạn";
        else lastSender = getState().user.userConnectList.find((index :User)=> index._id === message.senderId)!.last_name;
        const result:RoomChat[] = getState().message.listRoomChat.roomChats.map((index :RoomChat) => {
            if(index._id === message.roomId) return {...index, lastMessage: message.content, time: message.time, lastSender: lastSender};
            else return index;
        })

        const sortedData = result.sort((a, b) => {
            const dateA = dayjs(a.time, 'HH:mm, DD/MM');
            const dateB = dayjs(b.time, 'HH:mm, DD/MM');
            return dateA.isBefore(dateB) ? 1 : -1; // Sắp xếp theo thứ tự tăng dần
        });

        dispatch(messageAction.setListRoomChat({idUser: user._id, roomChats: sortedData}));
    }
}