import { User } from "../../../redux/user/user.state"
import hello_icon from './images/icon_hello.png'
import hello_image from './images/img_hello.png'
import tree_icon from './images/img_tree.png'
import './hellobox.css'

interface Props{
    account: User
}

export default function HelloBox({account}:Props){
    return(
        <div className="hello-box">
            <div className="text">
                <div className="title">
                    <figure><img src={hello_icon} alt="" /></figure>
                    <p>Xin chào, {account.last_name}!</p>
                </div>
                <p className="sub">Hôm nay là ngày <span>thứ 23</span> bạn đồng hành cùng chúng tôi. <br/>
                Hãy tiếp tục quan tâm đến Sức khỏe Tâm thần và yêu bản thân nhiều nhé!</p>
            </div>
            <figure className="image"><img src={hello_image} alt="" /></figure>
            <figure className="tree-icon"><img src={tree_icon} alt="" /></figure>
        </div>
    )
}