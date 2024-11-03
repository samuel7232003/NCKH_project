import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Welcome from "./page/welcome/Welcome";
import WelcomeChat from "./components/welcomeChat/WelcomeChat";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Homev2 from "./screens/Homev2";
import Dashboard from "./page/dashboard/Dashboard";
import DiaryPage from "./page/diarypage/DiaryPage";
import PersonalPage from "./page/personalpage/PersonalPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path: "",
                element: <Welcome/>,
                children:[
                    {
                        path: "",
                        element: <WelcomeChat/>,
                    },
                    {
                        path:"login",
                        element: <Login/>
                    },
                    {
                        path:"signup",
                        element: <Signup/>
                    }
                ]
            }   
        ]
    },
    {
        path:"/home",
        element: <Homev2/>,
        children:[
            {
                path:"",
                element: <Dashboard/>
            },
            {
                path:"diarypage",
                element: <DiaryPage/>
            },
            {
                path:"personal",
                element: <PersonalPage/>
            }
        ]
    }
])