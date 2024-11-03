import { DatePicker, message, Popconfirm, PopconfirmProps, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import edit_icon from "./images/Edit (2).png"
import dayjs from "dayjs";
import './personalpage.css'
import { useEffect, useState } from "react";
import { editUser } from "../../redux/user/user.action";

export default function PersonalPage(){
    const account = useAppSelector(state => state.user.user);
    const [acc, setAcc] = useState(account);
    const [editInfo, setEditInfo] = useState(false);
    const [editAcc, setEditAcc] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        setAcc(account);
        setConfirmPwd(account.password);
    },[account])

    useEffect(() => {
        setAcc({...acc, 
            first_name: account.first_name, 
            last_name: account.last_name, 
            birth: account.birth,
            gender: account.gender
        })
    }, [editInfo])

    useEffect(() => {
        setAcc({...acc, email: account.email, password: account.password});
        setConfirmPwd("");
    }, [editAcc])

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(acc);
        if(acc.last_name === "") {
            message.error("Tên của bạn không được để trống! Lưu thất bại!");
        }
        else if(acc.email === "") {
            message.error("Email không được để trống! Lưu thất bại!");
            setEditAcc(false);
        }
        else if(acc.password !== confirmPwd || acc.password==="") {
            message.error("Xác nhận mật khẩu thất bại! Lưu thất bại!");
            setEditAcc(false);
        }
        else{
            dispatch(editUser(acc));
            message.success("Đã lưu thông tin thành công!");
        }
    };
      
    const cancel: PopconfirmProps['onCancel'] = (e) => {
        setEditInfo(false);
        setEditAcc(false);
        message.info('Đã hủy lưu những thay đổi!');
    };
    
    return(
        <main className="main-personal">
            {account &&<div>
                <figure className="ava"><img src={`data:image/png;base64,${account.avatar}`} alt="" /></figure>
                <div className="name">
                    <p className="title">Họ và tên:</p>
                    {editInfo ? 
                        <div className="edit-name">
                            <fieldset><input onChange={(e) => setAcc({...acc, first_name: e.target.value})} value={acc.first_name}/></fieldset>
                            <fieldset><input onChange={(e) => setAcc({...acc, last_name: e.target.value})} value={acc.last_name}/></fieldset>
                        </div> 
                    :<p className="val">{account.first_name} {account.last_name}</p>}
                    <figure onClick={() => setEditInfo(!editInfo)}><img src={edit_icon} alt="" /></figure>
                </div>
                <div className="birth-gen">
                    <p>Ngày sinh:</p>
                    {editInfo ? <DatePicker onChange={(e) => {
                        if(e) setAcc({...acc, birth: e.format("YYYY-MM-DD")});
                        else setAcc({...acc, birth: ""});
                    }} value={dayjs(acc.birth)} maxDate={dayjs()}/>
                    : <p className="val">{account.birth}</p>}
                    <p>Giới tính:</p>
                    {editInfo ? 
                        <Select
                            defaultValue={acc.gender}
                            options={[
                                {value:"Nam", label:"Nam"},
                                {value:"Nữ", label:"Nữ"},
                                {value:"Khác", label:"Khác"}
                            ]}
                            onChange={val => setAcc({...acc, gender: val})}
                        />
                    :<p className="val">{account.gender}</p>
                    }
                </div>
                <div className="acc">
                    <h3>Thông tin đăng nhập</h3>
                    <div className="info">
                        <p className="title">Email:</p>
                        {editAcc? <input onChange={(e) => setAcc({...acc, email: e.target.value})} value={acc.email}/> 
                        :<p className="val">{account.email}</p>
                        }
                    </div>
                    <div className="info">
                        <p className="title">Mật khẩu:</p>
                        {editAcc?
                            <div className="edit-pwd">
                                <fieldset><input onChange={(e) => setAcc({...acc, password: e.target.value})} placeholder="Nhập mật khẩu mới" /></fieldset>
                                <fieldset><input onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Xác nhận mật khẩu mới" /></fieldset>
                            </div>
                        :<p className="val">**********</p>
                        }
                    </div>
                    <figure onClick={() => setEditAcc(!editAcc)}><img src={edit_icon} alt="" /></figure>
                </div>
                <Popconfirm 
                    title="Xác nhận thay đổi" description="Bạn có chắc chắn lưu những thay đổi này chứ?"
                    onCancel={cancel} onConfirm={confirm}
                >
                    <p className="save-btn">Xác nhận thay đổi</p>
                </Popconfirm>
            </div>}
        </main>
    )
}