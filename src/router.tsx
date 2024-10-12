import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Welcome from "./page/Welcome";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path: "",
                element: <Welcome/>
            }   
        ]
    }
])