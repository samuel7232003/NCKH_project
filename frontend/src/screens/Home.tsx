import { Outlet } from "react-router-dom";
import HeaderPre from "../components/header/HeaderPre";

function Home(){
    return (
        <div className="App">
            <HeaderPre/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Home;