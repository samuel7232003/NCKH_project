import { DatePicker, Select } from "antd";
import { useAppSelector } from "../../redux/builder";
import edit_icon from "./images/Edit (2).png"
import dayjs from "dayjs";
import './personalpage.css'

export default function PersonalPage(){
    const account = useAppSelector(state => state.user.user);
    
    return(
        <main className="main-personal">
            {account &&<div>
                <figure className="ava"><img src={`data:image/png;base64,${account.avatar}`} alt="" /></figure>
                <div className="name">
                    <p className="title">Họ và tên:</p>
                    <p className="val">{account.first_name} {account.last_name}</p>
                    <figure><img src={edit_icon} alt="" /></figure>
                </div>
                <div className="birth-gen">
                    <p>Ngày sinh:</p>
                    <DatePicker maxDate={dayjs()}/>
                    <p>Giới tính:</p>
                    <Select
                        options={[
                            {value:"male", label:"Nam"},
                            {value:"female", label:"Nữ"},
                            {value:"other", label:"Khác"}
                        ]}
                    />
                </div>
                <div className="acc">
                    <h3>Thông tin đăng nhập</h3>
                    <div className="info">
                        <p className="title">Email:</p>
                        <p className="val">{account.email}</p>
                    </div>
                    <div className="info">
                        <p className="title">Mật khẩu:</p>
                        <p className="val">**********</p>
                    </div>
                    <figure><img src={edit_icon} alt="" /></figure>
                </div>
                <p className="save-btn">Xác nhận thay đổi</p>
            </div>}
        </main>
    )
}