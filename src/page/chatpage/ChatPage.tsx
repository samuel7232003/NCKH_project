import { useState } from "react";
import ChatBox from "../../components/chatpage/chatbox/ChatBox";
import ListRoom from "../../components/chatpage/listroom/ListRoom"
import { useAppSelector } from "../../redux/builder"
import './chatpage.css'
import { RoomChat } from "../../redux/message/message.state";

export default function ChatPage(){
    const account = useAppSelector(state => state.user.user);
    const [curChatBox, setCurChatBox] = useState<RoomChat>();

    return(
        <main className="chatpage">
            <div className="list-room">
                {account._id!=="" && <ListRoom account={account} setChatBox={setCurChatBox} />}
            </div>
            <div className="chat-box">
                {account._id!=="" && <ChatBox account={account} chatBox={curChatBox} />}
            </div>
        </main>
    )
}