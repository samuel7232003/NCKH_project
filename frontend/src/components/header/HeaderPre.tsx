import { Link, useNavigate } from "react-router-dom";
import './headerPre.css'
import { User } from "../../redux/user/user.state";
import { login, signup } from "../../service/accountService";
import { initialUserState } from "../../redux/user/user.slice";

export default function HeaderPre(){
    const navigate = useNavigate();

    function handleTop(){
        window.scrollTo({ top: 0, behavior: 'smooth'})
    }

    function generateRandomString(length:number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function handleTryMode(){
        const email = generateRandomString(20);
        const pwd = generateRandomString(5);
        let user:User = { ...initialUserState.user, email: email, password: pwd, first_name:"Người dùng khách", last_name: "", role: "guest"}
        const checkSignUp = async() => {
            const res = await signup(user);
            if(res){
                const res_ = await login(email, pwd);
                localStorage.setItem("access_token", res_.access_token);
                setTimeout(() => navigate("/home"), 1000);
            }
        }

        try {
            checkSignUp();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <header className="pre h-[80px] flex bg-[rgba(0,0,0,0.4)] items-center px-[35px] text-[#fff] fixed top-0 right-0 left-0">
            <figure><img className="h-max" src="/logo.png" alt=""/></figure>
            <nav className="flex-grow px-[150px]">
                <ul className="flex gap-[32px] *:font-bold">
                    <li><Link to='/'>Về chúng tôi</Link></li>
                    <li><Link to='/'>Thông tin</Link></li>
                </ul>
            </nav>
            <Link className="font-bold" to="/login">
                <div onClick={handleTop} className="login-btn h-[47px] w-[100px] rounded-lg bg-[rgba(22,192,232,0.7)] flex justify-center items-center">
                    Đăng nhập
                </div>
            </Link>
            <div onClick={handleTryMode} className="login-btn h-[47px] w-[170px] rounded-lg bg-[rgba(22,192,232,0.7)] flex justify-center items-center ml-2 font-bold cursor-pointer">
                Chạm để trải nghiệm
            </div>
        </header>
    )
}