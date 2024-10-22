import { useAppSelector } from "../../redux/builder"
import HelloBox from "./hellobox/HelloBox";
import './dashboard.css'
import Dailynote from "./dailynote/Dailynote";

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
                        <div></div>
                    </div>
                </div>
                <div className="calendar"></div>
            </main>
        }
    </>
    )
}