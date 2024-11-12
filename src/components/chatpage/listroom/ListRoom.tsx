import { useState } from "react";
import list_icon from './images/Group_fill.png'
import addMode_icon from './images/dell_square.png'

export default function ListRoom(){
    const [isAddMode, setIsAddMode] = useState(false);
    return(
        (!isAddMode) ? <div className="list-room-main">
            <div className="title">
                <figure><img src={list_icon} alt="" /></figure>
                <h2>Danh sách người dùng</h2>
                <figure><img src={addMode_icon} alt="" /></figure>
            </div>
            <ul>
                <li>
                    <figure><img src="" alt="" /></figure>
                    <div>
                        <p>Lê Việt Thanh</p>
                        <p>Bạn: Chào bạn!</p>
                    </div>
                </li>
            </ul>
        </div>
        : <div className="list-room-main">

        </div>
    )
}