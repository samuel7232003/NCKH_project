import { useEffect, useState } from "react";
import list_icon from './images/Group_fill.png'
import addMode_icon from './images/dell_square.png'
import { User } from "../../../redux/user/user.state";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { Message, RoomChat } from "../../../redux/message/message.state";
import { getListRoomChat } from "../../../redux/message/message.action";
import './listroom.css'

interface Props{
    account: User;
    setChatBox: React.Dispatch<React.SetStateAction<RoomChat | undefined>>;
}

export default function ListRoom({account, setChatBox}:Props){
    const [isAddMode, setIsAddMode] = useState(false);
    const dispatch = useAppDispatch();
    const listRoom = useAppSelector(state => state.message.listRoomChat);
    
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

    useEffect(() => {
        if(listRoom.roomChats.length>0) setChatBox(listRoom.roomChats[0])
    }, [listRoom])

    return(
        (!isAddMode) ? <div className="list-room-main">
            <div className="title">
                <figure><img src={list_icon} alt="" /></figure>
                <h2>Danh sách người dùng</h2>
                <figure><img src={addMode_icon} alt="" /></figure>
            </div>
            <ul>
                {listRoom.roomChats.map(index => 
                    <li onClick={() => setChatBox(index)} className="room-item" key={index._id}>
                        <figure className="ava"><img src={index.avatar} alt="" /></figure>
                        <div>
                            <p className="name">{index.name}</p>
                            <p className="mess">{index.lastMessage}</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
        : <div className="list-room-main">

        </div>
    )
}