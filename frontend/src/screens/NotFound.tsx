import { useNavigate } from 'react-router-dom'
import './notfound.css'

export default function NotDefound(){
    const navigate = useNavigate();

    return(
        <div className="notfound">
            <div className='inner'>
                <p className='num'>404</p>
                <p>PAGE NOT FOUND!</p>
                <p onClick={() => navigate("/home")} className='button'>Trang chủ</p>
            </div>
        </div>
    )
}