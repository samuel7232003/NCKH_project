import { useAppSelector } from "../../redux/builder"
import HelloBox from "./hellobox/HelloBox";
import './dashboard.css'
import Dailynote from "./dailynote/Dailynote";
import FeelingChart from "./feelingchart/FeelingChart";
import Calendarbox from "./calendar/Calendarbox";
import Timeline from "./timeline/Timeline";
import avaChat from "./images/Avatar (1).png"

export default function Dashboard(){
    const account = useAppSelector(state => state.user.user);

    return(
    <>
        { (account._id !== "") &&
            <main className="main-dashboard">
                <div className="main-left">
                    <HelloBox account={account}/>
                    <div className="feeling">
                        <Dailynote account={account}/>
                        <FeelingChart account={account} />
                    </div>
                    <Timeline/>
                    <div className="option">
                        <div className="chat">
                            <div className="sub">
                                <figure><img src={avaChat} alt="" /></figure>
                                <h2>Người ẩn danh</h2>
                                <p>Nhấn để quay trở lại cuộc trò chuyện</p>
                            </div>
                        </div>
                        <div className="game">
                            <div className="sub">
                                <h2>Nhấn để chơi game</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Calendarbox account={account}/>
            </main>
        }
    </>
    )
}