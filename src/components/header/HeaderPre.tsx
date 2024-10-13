import { Link } from "react-router-dom";
import './headerPre.css'

export default function HeaderPre(){
    return(
        <header className="h-[80px] flex bg-[rgba(0,0,0,0.4)] items-center px-[35px] text-[#fff] fixed top-0 right-0 left-0">
            <figure><img className="h-max" src="/logo.png" alt=""/></figure>
            <nav className="flex-grow px-[150px]">
                <ul className="flex gap-[32px] *:font-bold">
                    <li><Link to='/'>Về chúng tôi</Link></li>
                    <li><Link to='/'>Thông tin</Link></li>
                </ul>
            </nav>
            <Link className="font-bold" to="/login">
                <div className="login-btn h-[47px] w-[156px] rounded-lg bg-[rgba(22,192,232,0.7)] flex justify-center items-center">
                    Đăng nhập
                </div>
            </Link>
        </header>
    )
}