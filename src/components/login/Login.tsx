import { Switch } from 'antd'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { accountLogin, login } from '../../service/accountService';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eError, setEError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [error, setError] = useState("");
    const [isSaveLogin, setIsSaveLogin] = useState(false);
    const navigate = useNavigate();

    function validate(type: "email"|"pwd", val : string){
        if(type === "email"){
            setEmail(val.trim());
            if(val === "") setEError(true);
            else setEError(false);
        }
        if(type === "pwd"){
            setPassword(val.trim());
            if(val === "") setPwdError(true);
            else setPwdError(false);
        }
    }

    const checklogin = async() =>{
        try {
            const res = await login(email, password);
            localStorage.setItem('userData', res.token);
            localStorage.setItem('email', res.email);
            setError("Đăng nhập thành công");
            setTimeout(() => navigate('/home'), 1000)
        } catch (error) {
            setError("Sai tên đăng nhập hoặc mật khẩu!");
        }
    }

    function handleLogin(){
        validate("email", email);
        validate("pwd", password);
        if(email==="" || password===""){
            setError("Không được để trống các trường!")
        }
        else{
            if(isSaveLogin) localStorage.setItem("saveLogin", "true");
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
                    <Switch onChange={(value) => setIsSaveLogin(value)}/>
                    <p>Ghi nhớ đăng nhập</p>
                </div>
                <button onClick={handleLogin}>ĐĂNG NHẬP</button>
                <p>Bạn chưa có tài khoản? <Link to="/signup">Đăng kí</Link></p>
            </div>
        </div>
    )
}