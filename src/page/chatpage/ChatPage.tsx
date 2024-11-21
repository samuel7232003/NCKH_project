import { useEffect, useState } from "react";
import ChatBox from "../../components/chatpage/chatbox/ChatBox";
import ListRoom from "../../components/chatpage/listroom/ListRoom"
import { useAppSelector } from "../../redux/builder"
import './chatpage.css'
import { RoomChat } from "../../redux/message/message.state";
import { useOutletContext } from "react-router-dom";

export default function ChatPage(){
    const {setPage}:any = useOutletContext();
    const account = useAppSelector(state => state.user.user);
    const [curChatBox, setCurChatBox] = useState<RoomChat>();
    const [mode, setMode] = useState(false);

    useEffect(() => {
        setPage("chat");
    },[account])

    function setCurChat(chatRoom : RoomChat){
        setCurChatBox(chatRoom);
        setMode(true);
    }

    return(
        <main className="chatpage">
            <div className={mode?"hide list-room":"show list-room"}>
                {account._id!=="" && <ListRoom account={account} setChatBox={setCurChat} chatBox={curChatBox} />}
            </div>
            <div className={mode?"show chat-box":"hide chat-box"}>
                {account._id!=="" && <ChatBox account={account} chatBox={curChatBox} setMode={setMode} />}
            </div>
        </main>
    )
}