import { User } from "../../../redux/user/user.state";
import setting_icon from './images/Setting_line.png'
import addImage_icon from './images/Img_box.png'
import send_icon from './images/Send_fill (2).png'
import { Message, RoomChat } from "../../../redux/message/message.state";
import './chatbox.css'
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { getListMessage, sendMessage } from "../../../redux/message/message.action";
import {io, Socket} from "socket.io-client";

interface Props{
    account: User;
    chatBox: RoomChat|undefined;
}

export default function ChatBox({account, chatBox}:Props){
    const [content, setContent] = useState("");
    const dispatch = useAppDispatch()
    const listMessages = useAppSelector(state => state.message.listMessage);
    const [socket, setSocket] = useState<Socket|null>(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {
        const fetchData = async () =>{
            try {
                if(chatBox) await dispatch(getListMessage(chatBox._id));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        if(socket===null && account._id!=="" && chatBox){
            const newSocket = io('http://localhost:3001', {
            // const newSocket = io('https://nckh-project.onrender.com', {
                query: {userId: account._id}
            });
        
            newSocket.on('connect', () => {
                console.log('Connected to WebSocket server');
            });
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

            newSocket.emit('join-room', chatBox._id);

            newSocket.on("receive", (data)=>{
                fetchData();
            })
        }
    }, [chatBox, account])

    useEffect(() => {
        
    }, [account])

    useEffect(() => {
        console.log(onlineUsers);
    },[onlineUsers])

    function handleSend(){
        const time = dayjs().format("HH:mm, DD/MM");
        const message :Message = {_id: "", senderId: account._id, roomId: chatBox!._id, content: content, type: "message", time:time};

        const send = async () =>{
            try {
                dispatch(sendMessage(message));
            } catch (error) {
                console.log(error);
            }
        }
        if(content!==""){
            send();
            socket?.emit('send', chatBox?._id)
        }
        setContent("");
    }

    useEffect(() => {
        scrollToBottom();
    },[listMessages])

    function handleEnter(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            handleSend();
        }
    }

    return(
        (chatBox) ? <div className="chat-box-main">
            <div className="title">
                <figure className="ava"><img src={chatBox.avatar} alt="" /></figure>
                <p>{chatBox.name}</p>
                <figure className="setting"><img src={setting_icon} alt="" /></figure>
            </div>
            <div className="chat-line">
                <ul >
                    {listMessages.messages.map(index => {
                        if(index.senderId === account._id) return <li key={index._id} className="mine">
                           <div className="text">
                                <p className="time">{index.time}</p>
                                <p className="content">{index.content}</p>
                            </div>
                        </li>
                        else return <li key={index._id} className="orther">
                            <figure className="ava"><img src={chatBox.avatar} alt="" /></figure>
                            <div className="text">
                                <p className="time">{index.time}</p>
                                <p className="content">{index.content}</p>
                            </div>
                        </li>
                    })}
                </ul>
                <div ref={messagesEndRef}></div>
            </div>
            <div className="footer">
                <Tooltip title="Gửi hình ảnh!"><figure className="addImage-btn"><img src={addImage_icon} alt="" /></figure></Tooltip>
                    <input onKeyDown={(e) => handleEnter(e)} value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder="Nhập tin nhắn tại đây..."/>
                <Tooltip title="Gửi tin nhắn!"><figure className="send-btn" onClick={handleSend}><img src={send_icon} alt="" /></figure></Tooltip>
            </div>
        </div>
        : <div className="chat-box-main"></div>
    )
}