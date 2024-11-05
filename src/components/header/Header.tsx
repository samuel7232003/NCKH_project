import { Link, useNavigate } from "react-router-dom";
import home_icon from "./images/Home_light.png"
import note_icon from "./images/package_box_alt.png"
import calendar_icon from "./images/Calendar_light.png"
import chat_icon from "./images/Chat.png"
import game_icon from "./images/Gamepad.png"
import noti_icon from "./images/Bell.png"
import edit_icon from "./images/Setting_alt_line_light.png"
import moreinfo_icon from "./images/File_dock_search.png"
import logout_icon from "./images/Sign_in_squre.png"
import './header.css'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { getUser } from "../../redux/user/user.action";

export default function Header(){
    const account = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [subBox, setSubBox] = useState<"ava"|"noti"|null>(null);
    const [active, setActive] = useState("home");

    useEffect(() => {
        const fectchData = async () => {
            const data = localStorage.getItem('email');
            if(data) await dispatch(getUser(data));
        }
        fectchData()
    }, []);

    function handleLogout(){
        localStorage.clear();
        setTimeout(() => navigate("/"), 1000);
    }

    function handleOpenBox(type: "ava"|"noti"|null){
        if(type!==subBox) setSubBox(type);
        else setSubBox(null)
    }

    return(
        <header className="main">
            <figure className="logo"><img src="/logo.png" alt=""/></figure>
            <nav>
                <ul>
                    <li className={(active === "home") ? "active":""} onClick={() => setActive("home")}>
                        <Link to="/home">
                            <figure><img src={home_icon} alt="" /></figure>
                            <p>Trang chủ</p>
                        </Link>
                    </li>
                    <li className={(active === "diary") ? "active":""} onClick={() => setActive("diary")}>
                        <Link to="./diarypage">
                            <figure><img src={note_icon} alt="" /></figure>
                            <p>Nhật ký</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="./timetable">
                            <figure><img src={calendar_icon} alt="" /></figure>
                            <p>Thời khóa biểu</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="./">
                            <figure><img src={chat_icon} alt="" /></figure>
                            <p>Trò chuyện</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="./">
                            <figure><img src={game_icon} alt="" /></figure>
                            <p>Giải trí</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="noti_ava">
                <figure className="noti"><img src={noti_icon} alt="" /></figure>
                <figure className="ava" onClick={() => handleOpenBox("ava")}>
                    {(!account.avatar) ? <p>Loading!</p> : <img src={`data:image/png;base64,${account.avatar}`} alt="" />}
                </figure>
            </div>
            {
                (subBox === "ava") &&
                    <div className="ava-box">
                        <div onClick={() => {navigate('./personal'); setSubBox(null)}} className="my-infor">
                            <div className="main">
                                <figure><img src={`data:image/png;base64,${account.avatar}`} alt="" /></figure>
                                <p>{account.first_name} {account.last_name}</p>
                            </div>
                            <figure className="edit"><img src={edit_icon} alt="" /></figure>
                        </div>
                        <ul>
                            <li>
                                <figure><img src={moreinfo_icon} alt="" /></figure>
                                <p>Xem thông tin SKTT</p>
                            </li>
                            <li onClick={handleLogout}>
                                <figure><img src={logout_icon} alt="" /></figure>
                                <p>Đăng xuất</p>
                            </li>
                        </ul>
                    </div>
            }
        </header>
    )
}