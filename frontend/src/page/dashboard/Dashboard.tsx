import { useAppSelector } from "../../redux/builder"
import HelloBox from "../../components/dashboard/hellobox/HelloBox";
import './dashboard.css'
import Dailynote from "../../components/dashboard/dailynote/Dailynote";
import FeelingChart from "../../components/dashboard/feelingchart/FeelingChart";
import Calendarbox from "../../components/dashboard/calendar/Calendarbox";
import Timeline from "../../components/dashboard/timeline/Timeline";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect} from "react";

export default function Dashboard(){
    const avaDefault = 'https://res.cloudinary.com/df7mhs6xj/image/upload/v1730885237/gvh57hvea5d1e5sjqjrx.png';
    const {setPage}:any = useOutletContext();
    const account = useAppSelector(state => state.user.user);
    const listRoom = useAppSelector(state => state.message.listRoomChat);
    const navigate = useNavigate();

    useEffect(() => {
        setPage("dashboard");
        // eslint-disable-next-line
    }, [account])

    function chatBox(){
        if(listRoom.roomChats.length>0)
        return(
            <div onClick={() => navigate('./chatpage')} className="chat" style={{backgroundImage: `url("${listRoom.roomChats[0].avatar}")`}}>
                <div className="sub">
                    <figure><img src={listRoom.roomChats[0].avatar} alt="" /></figure>
                    <h2>{listRoom.roomChats[0].name}</h2>
                    <p>Nhấn để quay trở lại cuộc trò chuyện</p>
                </div>
            </div>
        )
        else
        return(
            <div onClick={() => navigate('./chatpage')} className="chat" style={{backgroundImage: `url("${avaDefault}")`}}>
                <div className="sub">
                    <figure><img src={avaDefault} alt="" /></figure>
                    <h2>Người ẩn danh</h2>
                    <p>Nhấn để quay trở lại cuộc trò chuyện</p>
                </div>
            </div>
        )
    }

    return(
    <>
        {/* { (account._id !== "") && */}
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
                        {chatBox()}
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
        {/* } */}
    </>
    )
}