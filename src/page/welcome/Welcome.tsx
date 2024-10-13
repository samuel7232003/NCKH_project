import down_icon from "./images/down-icon.png"
import './welcome.css'
import { Outlet } from "react-router-dom";

export default function Welcome(){
    return (
    <>
        <div className="bg-welcome-bg w-[100vw] h-[100vh] bg-cover fixed z-[-1]"></div>
        <main className="h-[100vh] flex justify-center items-center px-3">
            <div className="min-h-h-[380px] w-[1200px] flex">
                <div className="w-[45%] text-[#fff] pr-[32px]">
                    <h1 className="text-[42px] font-bold">Chào mừng bạn đến <br/> với...</h1>
                    <p>Một website quan tâm đến sức khỏe tâm thần của bạn ...</p>
                </div>
                <Outlet/>
            </div>
            <div className="scroll-down w-[125px] absolute bottom-2 text-center">
                <a href="#infor">
                    <p className="text-[#fff] text-[14px]">Lướt xuống để khám phá</p>
                    <figure><img className="mx-auto" src={down_icon} alt="" /></figure>
                </a>
            </div>
        </main>
        <div id="infor" className="h-[100vh] bg-cover flex justify-center items-center px-3"></div>
    </>
    )
}