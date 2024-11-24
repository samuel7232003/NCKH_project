import { User } from "../../../redux/user/user.state";
import setting_icon from './images/Setting_line.png'
import addImage_icon from './images/Img_box.png'
import send_icon from './images/Send_fill (2).png'
import { Message, RoomChat } from "../../../redux/message/message.state";
import './chatbox.css'
import { message} from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { getListMessage, removeRoomChat, sendMessage, setListRoom } from "../../../redux/message/message.action";
import back_icon from './images/Expand_left.png';
import delete_icon from './images/Trash_duotone_line.png'
import axios from "axios";
import deleteImgae_icon from './images/Close_square_duotone_broken_line.png'
import { useOutletContext } from "react-router-dom";

interface Props{
    account: User;
    chatBox: RoomChat|undefined;
    setMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatBox({account, chatBox, setMode}:Props){
    const dispatch = useAppDispatch();
    const listMessages = useAppSelector(state => state.message.listMessage);
    const listOnl = useAppSelector(state => state.user.onlineUsers);
    const listConUser = useAppSelector(state => state.user.userConnectList);
    const listRoom = useAppSelector(state => state.message.listRoomChat);

    const [content, setContent] = useState("");
    const [settingBox, setSettingBox] = useState(false);
    const [image, setImage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputImage = useRef<HTMLInputElement | null>(null);
    const chat = useRef(chatBox);

    const {socket}:any = useOutletContext();

    const fetchData = async () =>{
        try {
            if(chatBox) await dispatch(getListMessage(chatBox._id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData(); chat.current = chatBox;
        // eslint-disable-next-line
    }, [chatBox])

    useEffect(() => {
        if(account._id!=="" && chat.current){

            socket.emit('join-room', listRoom.roomChats);

            socket.on("receive", (data:any)=>{
                if(data.roomId === chat.current!._id){
                    fetchData(); fetchData();
                }
                dispatch(setListRoom(data));
            })
        }
        // eslint-disable-next-line
    }, [chatBox, account])

    function handleSend(){
        const time = dayjs().format("HH:mm, DD/MM");
        const message :Message = {_id: "", senderId: account._id, roomId: chatBox!._id, content: content, type: "message", time:time};
        let messImage :Message = {...message};
        if(image!=="") messImage = {...message, content: image, type: "image"};

        const send = async (mess: Message) =>{
            try {
                dispatch(sendMessage(mess));
            } catch (error) {
                console.log(error);
            }
        }
        if(content!==""){
            send(message);
            socket?.emit('send', message);
        }
        if(image!=="" && messImage.type === "image"){
            send(messImage);
            socket?.emit('send', message);
        }
        setContent("");
        setImage("");
        inputRef.current?.focus();
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    },[listMessages])

    function handleEnter(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            handleSend();
        }
    }

    function checkOnl(){
        const check = listConUser.find(index => {
            const name = index.first_name + " " + index.last_name;
            if(index.avatar === chatBox?.avatar && name === chatBox.name) return true;
            else return false;
        } )
        if(check){
            const result = listOnl.find(index => index === check._id);
            if(result) return true;
        }
        return false;
    }

    function handleDeleteRoom(roomId: string){
        const deleteRoom = async () => {
            try {
                message.info("Đang thực hiện xóa đoạn chat!");
                await dispatch(removeRoomChat(roomId, account._id));
                message.success("Xóa xong đoạn chat");
            } catch (error) {
                console.log(error);
            }
        }
        deleteRoom();
    }

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>){
        let file;
        if(e.target.files) file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", 'qwertyu');
            axios.post('https://api.cloudinary.com/v1_1/df7mhs6xj/image/upload', formData).then((res) => {
                const url = res.data.secure_url;
                setImage(url);
            })
        }
    }

    function divMess(type: string, index: Message){
        if(type === "message"){
            return(
                <div className="text">
                    <p className="time">{index.time}</p>
                    <p className="content">{index.content}</p>
                </div>
            )
        }
        if(type === "image"){
            return(
                <div className="text img">
                    <p className="time">{index.time}</p>
                    <figure className="text-img"><img src={index.content} alt="" /></figure>
                </div>
            )
        }
    }

    return(
        (chatBox) ? <div className="chat-box-main">
            <div className="title">
                <figure className="back" onClick={() => setMode(false)}><img src={back_icon} alt="" /></figure>
                <figure className="ava"><img src={chatBox.avatar} alt="" /></figure>
                <div className="name-box">
                    <p className="name">{chatBox.name}</p>
                    {checkOnl() ?<div className="status">
                         <span style={{background: "#008000"}}></span><p>Online</p> 
                    </div>:
                    <div className="status">
                        <span style={{background: "#999"}}></span><p>Offline</p> 
                    </div>
                    }
                </div>
                <figure className="setting" onClick={() => setSettingBox(!settingBox)}><img src={setting_icon} alt="" /></figure>
                {settingBox && <div className="setting-box">
                    <p className="setting-box-title">Cài đặt</p>
                    <ul>
                        <li onClick={() => handleDeleteRoom(chatBox._id)}>
                            <figure><img src={delete_icon} alt="" /></figure>
                            <p>Xóa đoạn chat này</p>
                        </li>
                    </ul>
                </div>}
            </div>
            <div className="chat-line">
                <ul>
                    {listMessages.messages.map(index => {
                        if(index.senderId === account._id) return <li key={index._id} className="mine">
                            {divMess(index.type, index)}
                        </li>
                        else return <li key={index._id} className="orther">
                            <figure className="ava"><img src={chatBox.avatar} alt="" /></figure>
                            {divMess(index.type, index)}
                        </li>
                    })}
                </ul>
                <div ref={messagesEndRef}></div>
            </div>
            <div className="footer">
                <figure className="addImage-btn" onClick={() => inputImage.current?.click()}><img src={addImage_icon} alt="" /></figure>
                <input ref={inputImage} onChange={e => handleUpload(e)} type="file" accept=".jpg, .png" style={{display: "none"}}/>
                <input ref={inputRef} onKeyDown={(e) => handleEnter(e)} value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder="Nhập tin nhắn tại đây..."/>
                <figure className="send-btn" onClick={handleSend}><img src={send_icon} alt="" /></figure>
                {(image!=="") && <div className="image-show">
                    <figure className="main"><img src={image} alt="" /></figure>
                    <figure className="remove" onClick={() => setImage("")}><img src={deleteImgae_icon} alt="" /></figure>
                </div>}
            </div>
        </div>
        : <div className="chat-box-main"></div>
    )
}