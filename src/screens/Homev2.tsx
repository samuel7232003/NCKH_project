import { Outlet } from "react-router-dom";
import HeaderPre from "../components/header/HeaderPre";

function Homev2(){
    return (
        <div className="App">
            <HeaderPre/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Homev2;