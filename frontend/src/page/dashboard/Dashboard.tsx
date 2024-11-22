import { useAppSelector } from "../../redux/builder"
import HelloBox from "../../components/dashboard/hellobox/HelloBox";
import './dashboard.css'
import Dailynote from "../../components/dashboard/dailynote/Dailynote";
import FeelingChart from "../../components/dashboard/feelingchart/FeelingChart";
import Calendarbox from "../../components/dashboard/calendar/Calendarbox";
import Timeline from "../../components/dashboard/timeline/Timeline";
import avaChat from "./images/Avatar (1).png"
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard(){
    const {setPage}:any = useOutletContext();
    const account = useAppSelector(state => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        setPage("dashboard");
        // eslint-disable-next-line
    }, [account])

    return(
    <>
        { (account._id !== "") &&
        <main className="dashboard">
            <main className="main-dashboard">
                <div className="main-left">
                    <HelloBox account={account}/>
                    <div className="feeling">
                        <Dailynote account={account} type="today"/>
                        <FeelingChart account={account} />
                    </div>
                    <Timeline account={account}/>
                    <div className="option">
                        <div onClick={() => navigate('./chatpage')} className="chat">
                            <div className="sub">
                                <figure><img src={avaChat} alt="" /></figure>
                                <h2>Người ẩn danh</h2>
                                <p>Nhấn để quay trở lại cuộc trò chuyện</p>
                            </div>
                        </div>
                        <div onClick={() => navigate('./gamepage')} className="game">
                            <div className="sub">
                                <h2>Nhấn để chơi game</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Calendarbox account={account}/>
            </main>
        </main>
        }
    </>
    )
}