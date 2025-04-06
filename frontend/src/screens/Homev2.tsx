import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SoundMix from "../components/soundmix/SoundMix";

function Homev2(){
    const [page, setPage] = useState("dashboard");
    const [socket, setSocket] = useState<Socket|null>(null);

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const check = localStorage.getItem("access_token");
        // if(check) setIsLogin(true);
        // else {
        //     setIsLogin(false);
        //     navigate("/");
        // }
        // eslint-disable-next-line
    }, [])
    
    return (
        // isLogin ? <div className="App">
        //     <Header page={page} setPage={setPage} socket={socket} setSocket={setSocket}/>
        //     <div>
        //         <Outlet context={{setPage, socket, setSocket}}/>
        //     </div>
        //     <SoundMix/>
        // </div> : <div className="App"></div>
        <div className="App">
            <Header page={page} setPage={setPage} socket={socket} setSocket={setSocket}/>
            <div>
                <Outlet context={{setPage, socket, setSocket}}/>
            </div>
            <SoundMix/>
        </div>
    )
}

export default Homev2;