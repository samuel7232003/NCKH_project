import { useAppSelector } from "../../redux/builder"
import HelloBox from "./hellobox/HelloBox";
import './dashboard.css'
import Dailynote from "./dailynote/Dailynote";
import FeelingChart from "./feelingchart/FeelingChart";
import Calendarbox from "./calendar/Calendarbox";
import Timeline from "./timeline/Timeline";

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
                        <div className="chat"></div>
                        <div className="game"></div>
                    </div>
                </div>
                <Calendarbox account={account}/>
            </main>
        }
    </>
    )
}