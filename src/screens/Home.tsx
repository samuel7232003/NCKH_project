import { Outlet } from "react-router-dom";

function Home(){
    return (
        <div className="App">
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Home;