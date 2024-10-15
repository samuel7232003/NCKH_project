import { Link } from "react-router-dom";
import home_icon from "./images/Home_light.png"
import note_icon from "./images/package_box_alt.png"
import calendar_icon from "./images/Calendar_light.png"
import chat_icon from "./images/Chat.png"
import game_icon from "./images/Gamepad.png"
import noti_icon from "./images/Bell.png"
import './header.css'
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { getUser } from "../../redux/user/user.action";

export default function Header(){
    const account = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fectchData = async () => {
            const data = localStorage.getItem('email')
            if(data) { await dispatch(getUser(data))}
        }
        fectchData()
    }, [])

    // useEffect(() => {
    //     console.log(account)
    //     if(account.id !=="") {
    //         setIsLoading(false);
    //         console.log(account.avatar);
    //         avatar.current = account.avatar;
    //     }
    // }, [account])

    return(
        <header className="main">
            <figure className="logo"><img src="/logo.png" alt=""/></figure>
            <nav>
                <ul>
                    <li className="active">
                        <Link to="/">
                            <figure><img src={home_icon} alt="" /></figure>
                            <p>Trang chủ</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <figure><img src={note_icon} alt="" /></figure>
                            <p>Nhật ký</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <figure><img src={calendar_icon} alt="" /></figure>
                            <p>Thời khóa biểu</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <figure><img src={chat_icon} alt="" /></figure>
                            <p>Trò chuyện</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <figure><img src={game_icon} alt="" /></figure>
                            <p>Giải trí</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="noti_ava">
                <figure className="noti"><img src={noti_icon} alt="" /></figure>
                <figure className="ava">
                    {(!account.avatar) ? <p>Loading!</p> : <img src={`data:image/png;base64,${account.avatar}`} alt="" />}
                </figure>
            </div>
        </header>
    )
}