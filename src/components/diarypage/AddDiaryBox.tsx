import verySad from '../../image/🦆 emoji _loudly crying face_ (1).png'
import sad from '../../image/🦆 emoji _slightly frowning face_ (1).png'
import normal from '../../image/🦆 emoji _slightly smiling face_ (1).png'
import happy from '../../image/🦆 emoji _smiling face with open mouth and smiling eyes_ (1).png'
import veryHappy from '../../image/🦆 emoji _smiling face with heart-shaped eyes_ (1).png'
import save_icon from '../../page/diarypage/images/Send_fill.png'
import { DatePicker, message, Select } from "antd";
import dayjs from 'dayjs'
import { useState } from 'react'
import { initalDiaryState } from '../../redux/diary/diary.slice'
import { User } from '../../redux/user/user.state'
import { Diary, ListDiary } from '../../redux/diary/diary.state'
import { addDiary } from '../../service/diaryService'
import diary_icon from '../../page/diarypage/images/notebook.png'

interface Props{
    account: User,
    listDiary: ListDiary,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AppDiaryBox({account, listDiary, setOpen}:Props){
    const [diary, setDiary] = useState({...initalDiaryState.diary, survey: 5, idUser: account._id});
    const [errorDate, setErrorDate] = useState(false);
    
    async function saveDiary(dia: Diary) {
        try {
            const res = await addDiary(dia);
        } catch (error) {
            console.log(error);   
        }
    }

    function handleSave(){
        const dia = listDiary.diarys.find(index => index.date === diary.date);
        if(diary.date===""){
            message.info("Hãy chọn ngày!");
            setErrorDate(true);
        }
        else if (dia) {
            message.info("Ngày này đã tồn tại, hãy xóa nó trước khi thêm!");
            setErrorDate(true);
        }
        else {
            saveDiary(diary);
            message.success("Đã lưu nhật kí mới thành công!");
            setOpen(false);
        }
    }

    return(
        <div className="add-diary-box">
            <div className='header'>
                <figure><img src={diary_icon} alt="" /></figure>
                <h3>Tạo mới một nhật kí</h3>
            </div>
            <div className="pick-date">
                <p>Ngày:</p>
                <DatePicker className={errorDate ?'border-[red]':""} onChange={e => {
                    if(e) setDiary({...diary, date: e.format("YYYY-MM-DD")})
                    else setDiary({...diary, date: ""})
                }} maxDate={dayjs()}/>
            </div>
            <div className="pick-emoji">
                <p>Tâm trạng:</p>
                <Select
                    options={[
                        {value:5, label: <div className="e-val"> <figure><img src={veryHappy} alt="" /></figure> Rất vui vẻ </div>},
                        {value:4, label: <div className="e-val"> <figure><img src={happy} alt="" /></figure> Vui vẻ </div>},
                        {value:3, label: <div className="e-val"> <figure><img src={normal} alt="" /></figure> Bình thường</div>},
                        {value:2, label: <div className="e-val"> <figure><img src={sad} alt="" /></figure> Buồn bã</div>},
                        {value:1, label: <div className="e-val"> <figure><img src={verySad} alt="" /></figure> Rất buồn </div>},
                    ]}
                    defaultValue={5}
                    onChange={e => setDiary({...diary, survey: e})}
                />
            </div>
            <textarea onChange={e => setDiary({...diary, message: e.target.value})} name="" id="" placeholder="Nhập thêm ghi chú..."></textarea>
            <div onClick={() => handleSave()} className="save-btn">
                <figure><img src={save_icon} alt="" /></figure>
                <p>Lưu</p>
            </div>
        </div>
    )
}