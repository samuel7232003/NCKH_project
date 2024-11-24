import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { useState } from "react";
import { Socket } from "socket.io-client";
import SoundMix from "../components/soundmix/SoundMix";

function Homev2(){
    const [page, setPage] = useState("dashboard");
    const [socket, setSocket] = useState<Socket|null>(null);
    
    return (
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