import { Switch } from 'antd'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../service/accountService';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eError, setEError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function validate(type: "email"|"pwd", val : string){
        if(type === "email"){
            setEmail(val);
            if(val === "") setEError(true);
            else setEError(false);
        }
        if(type === "pwd"){
            setPassword(val);
            if(val === "") setPwdError(true);
            else setPwdError(false);
        }
    }

    const checklogin = async() =>{
        try {
            const res = await login(email, password);
            setError("Đăng nhập thành công");
            setTimeout(() => navigate('/home'), 1000)
        } catch (error) {
            setError("Đăng nhập thất bại");
        }
    }

    function handleLogin(){
        validate("email", email);
        validate("pwd", password);
        if(email==="" || password===""){
            setError("Không được để trống các trường!")
        }
        else{
            checklogin();
        }
    }
    
    return(
        <div className='login'>
            <h2>Đăng nhập</h2>
            <div className='form'>
                <p className='error'>{error}</p>
                <fieldset><input className={(eError ? "error" : "")} onChange={(e) => validate("email", e.target.value)} value={email} type="email" placeholder="Email" /></fieldset>
                <fieldset><input className={(pwdError ? "error" : "")} onChange={(e) => validate("pwd", e.target.value)} value={password} type="password" placeholder="Mật khẩu" /></fieldset>
                <div className='remember-login'>
                    <Switch/>
                    <p>Ghi nhớ đăng nhập</p>
                </div>
                <button onClick={handleLogin}>ĐĂNG NHẬP</button>
                <p>Bạn chưa có tài khoản? <Link to="/signup">Đăng kí</Link></p>
            </div>
        </div>
    )
}