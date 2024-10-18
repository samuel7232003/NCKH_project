import { useAppSelector } from "../../redux/builder"
import HelloBox from "./hellobox/HelloBox";
import './dashboard.css'

export default function Dashboard(){
    const account = useAppSelector(state => state.user.user);

    return(
    <>
        { (account.id !== "") &&
            <main className="main-dashboard">
                <div className="main-left">
                    <HelloBox account={account}/>
                </div>
                <div className="calendar"></div>
            </main>
        }
    </>
    )
}