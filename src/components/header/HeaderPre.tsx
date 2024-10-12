import { Link } from "react-router-dom";

export default function HeaderPre(){
    return(
        <header className="h-[80px] w-[100vw] flex bg-[rgba(0,0,0,0.4)] items-center px-[35px] text-[#fff] absolute">
            <figure><img className="h-max" src="/logo.png" alt=""/></figure>
            <nav className="flex-grow px-[150px]">
                <ul className="flex gap-[32px] *:font-bold">
                    <li><Link to='/'>Về chúng tôi</Link></li>
                    <li><Link to='/'>Thông tin</Link></li>
                </ul>
            </nav>
            <Link className="font-bold" to="/login">
                <div className="h-[47px] w-[156px] rounded-lg bg-[rgba(22,192,232,0.7)] flex justify-center items-center">
                    Đăng nhập
                </div>
            </Link>
        </header>
    )
}