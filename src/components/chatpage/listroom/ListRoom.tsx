import { useEffect, useState } from "react";
import list_icon from './images/Group_fill.png'
import addMode_icon from './images/dell_square.png'
import { User } from "../../../redux/user/user.state";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { Message, RoomChat } from "../../../redux/message/message.state";
import { getListRoomChat} from "../../../redux/message/message.action";
import './listroom.css'
import { Tooltip } from "antd";
import add_icon from './images/group_add_fill.png'
import back_icon from './images/Import_fill.png'
import { getAllUser } from "../../../service/accountService";
import con_icon from './images/Send_fill (3).png'
import dayjs from "dayjs";
import { sendMessageMess } from "../../../service/messageService";

interface Props{
    account: User;
    setChatBox: (chatRoom: RoomChat) => void;
    chatBox: RoomChat|undefined;
}

export default function ListRoom({account, setChatBox, chatBox}:Props){
    const dispatch = useAppDispatch();
    const listRoom = useAppSelector(state => state.message.listRoomChat);
    const listConUser = useAppSelector(state => state.user.userConnectList);
    const listOnl = useAppSelector(state => state.user.onlineUsers);

    const [isAddMode, setIsAddMode] = useState(false);
    const [listUser, setListUser] = useState<User[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getListRoomChat(account._id));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[account])

    function handleChange(){
        setIsAddMode(true);
        const fetchData = async () => {
            const res:User[] = await getAllUser();
            const data:User[] = res.filter(index => {
                if(index._id === account._id) return false;
                for(let i = 0; i< listConUser.length; i++){
                    if(index._id === listConUser[i]._id) return false;
                }
                return true;
            });
            setListUser(data);
        }
        fetchData();
    }

    function handleOpenChat(id: string){
        const time = dayjs().format("HH:mm, DD/MM");
        const message: Message = {_id: "", senderId: account._id, roomId: "", content: id, type: "join", time:time};
        const openChat = async () => {
            try {
                await sendMessageMess(message);
                await dispatch(getListRoomChat(account._id));
                setIsAddMode(false);
            } catch (error) {
                console.log(error);
            }
        }
        openChat();
    }

    function checkOnline(ava: string, name: string){
        const list = listConUser.filter(index => {
            for(let i = 0; i < listOnl.length;i++){
                if(index._id === listOnl[i]) return true;
            }
            return false;
        })
        const find = list.find(index =>{
            const name_acc = index.first_name + " " + index.last_name;
            if(index.avatar === ava && name_acc === name) return true;
            else return false;
        })
        if(find) return true;
        else return false;
    }

    return(
        (!isAddMode) ? <div className="list-room-main">
            <div className="title">
                <figure><img src={list_icon} alt="" /></figure>
                <h2>Danh sách người dùng</h2>
                <Tooltip title="Tìm kết nối mới">
                    <figure className="add-new-con" onClick={handleChange}><img src={addMode_icon} alt="" /></figure>
                </Tooltip>
            </div>
            <ul>
                {(listRoom.roomChats.length > 0) ?
                listRoom.roomChats.map(index => 
                    <li style={(chatBox && chatBox._id === index._id) ? {background: '#c0c0c0'}:undefined} onClick={() => setChatBox(index)} className="room-item" key={index._id}>
                        <div className="box-ava">
                            <figure className="ava"><img src={index.avatar} alt="" /></figure>
                            {checkOnline(index.avatar, index.name) && <span></span>}
                        </div>
                        <div>
                            <p className="name">{index.name}</p>
                            <p className="mess">{index.lastSender}: {index.lastMessage}</p>
                        </div>
                    </li>
                ):
                <p className="noti-non">Bạn chưa có kết nối nào, hãy thêm kết nối mới ngay!</p>
                }
            </ul>
        </div>
        : <div className="list-room-main">
            <div className="title">
                <figure><img src={add_icon} alt="" /></figure>
                <h2>Kết nối với người mới</h2>
                <Tooltip title="Tìm kết nối mới">
                    <figure className="add-new-con" onClick={() => setIsAddMode(false)}><img src={back_icon} alt="" /></figure>
                </Tooltip>
            </div>
            <ul>
                {listUser.map(index =>
                    <Tooltip title="Nhấn để kết nối ngay!" key={index._id}>
                        <li className="room-item" onClick={() => handleOpenChat(index._id)}>
                            <figure className="ava"><img src={index.avatar} alt="" /></figure>
                            <div>
                                <p className="name">{index.first_name} {index.last_name}</p>
                            </div>
                            <figure className="con"><img src={con_icon} alt="" /></figure>
                        </li>
                    </Tooltip>
                )}
            </ul>
        </div>
    )
}