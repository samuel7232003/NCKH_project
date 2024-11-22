import { message, Switch } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { useState } from 'react'
import { User } from '../../redux/user/user.state'
import { initialUserState } from '../../redux/user/user.slice'
import { login, signup } from '../../service/accountService'
import see_pwd from "../../image/View_light.png"

export default function Signup(){
    const [user, setUser] = useState<User>(initialUserState.user);
    const [checkPwd, setCheckPwd] = useState("");
    const [error, setError] = useState("");
    const naviagte = useNavigate();
    const [visiPwd, setVisiPwd] = useState(false);

    function handleInput(type: "first_name"|"last_name"|"email"|"password"|"check-pwd", val: string){
        if(type === "check-pwd") setCheckPwd(val.trim());
        else setUser({...user, [type as keyof User]: val});
    }

    const checkSignup = async () =>{
        message.loading("Đang tạo tài khoản mới!");
        try {
            const res = await signup(user);
            console.log(res);
            if(!res) setError("Email đăng kí đã tồn tại!");
            else{
                message.success("Đăng kí thành công!");
                const res_ = await login(user.email, user.password);
                localStorage.setItem('access_token', res_.access_token);
                setTimeout(() => naviagte('/home'), 1000);
            }
        } catch (error) {
            console.log(error);
            setError("Đăng kí thất bại!");
        }
    }

    function handleSignup(){
        if(user.email === "" || user.first_name ==="" || user.last_name==="" || user.password===""){
            setError("Không được để trống các trường!")
        }
        else if(user.password !== checkPwd) setError("Xác nhận mật khẩu không đúng!");
        else checkSignup()
    }

    return(
        <div className='signup'>
            <h2>Đăng kí</h2>
            <div className='form'>
                <p className='error'>{error}</p>
                <fieldset className='name'>
                    <input onChange={e => handleInput("first_name", e.target.value)} className='firt-name' type="text" placeholder="Họ" />
                    <input onChange={e => handleInput("last_name", e.target.value)} className='last-name' type="text" placeholder="Tên" />
                </fieldset>
                <fieldset><input onChange={e => handleInput('email', e.target.value)} type="email" placeholder="Email" /></fieldset>
                <fieldset className='pwd-field'>
                    <input onChange={e => handleInput('password', e.target.value)} type={visiPwd?"text":"password"} placeholder="Mật khẩu" />
                    <figure onClick={() => setVisiPwd(!visiPwd)}><img src={see_pwd} alt="" /></figure>
                </fieldset>
                <fieldset className='pwd-field'>
                    <input onChange={e => handleInput('check-pwd', e.target.value)} type={visiPwd?"text":"password"} placeholder="Xác nhận mật khẩu" />
                    <figure onClick={() => setVisiPwd(!visiPwd)}><img src={see_pwd} alt="" /></figure>
                </fieldset>
                <div className='remember-login'>
                    <Switch/>
                    <p>Ghi nhớ đăng nhập</p>
                </div>
                <button onClick={handleSignup}>ĐĂNG KÍ</button>
                <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
    )
}