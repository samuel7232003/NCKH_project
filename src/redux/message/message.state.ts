
export interface Message{
    _id: string;
    senderId: string;
    roomId: string;
    content: string;
    type: string;
    time: string;
}

export interface RoomChat{
    _id: string;
    name: string;
    lastMessage: string;
    isSeen: boolean;
    avatar: string;
    time: string;
    lastSender: string;
}

export interface ListMessage{
    idRoom: string;
    messages: Message[];
}

export interface ListRoomChat{
    idUser: string;
    roomChats: RoomChat[]; 
}

export interface MessageModel{
    listMessage: ListMessage;
    listRoomChat: ListRoomChat
} 
