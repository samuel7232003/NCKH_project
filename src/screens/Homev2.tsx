import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function Homev2(){
    return (
        <div className="App">
            <Header/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Homev2;