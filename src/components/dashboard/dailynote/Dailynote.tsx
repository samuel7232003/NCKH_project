import verySad from './images/🦆 emoji _loudly crying face_.png'
import sad from './images/🦆 emoji _slightly frowning face_.png'
import normal from './images/🦆 emoji _slightly smiling face_.png'
import happy from './images/🦆 emoji _smiling face with open mouth and smiling eyes_.png'
import veryHappy from './images/🦆 emoji _smiling face with heart-shaped eyes_.png'
import send_icon from './images/Send_fill.png'
import './dailynote.css'
import { useEffect, useState } from 'react'
import { User } from '../../../redux/user/user.state'
import { useAppDispatch, useAppSelector } from '../../../redux/builder'
import { getListDiary } from '../../../redux/diary/diary.action'
import { addDiary } from '../../../service/diaryService'
import { Diary } from '../../../redux/diary/diary.state'
import moment from 'moment'

interface Props{
    account: User
}

export default function Dailynote({account}: Props){
    const [dailyEmotion, setDailyEmotion] = useState<string|null>(null);
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();
    const listDiary = useAppSelector(state => state.diary.listDiary);

    useEffect(() =>{
        const fectchData = async () =>{
            if(account._id !== "") await dispatch(getListDiary("123"))
        }
        fectchData()
    }, []);

    function handleSelect(type: string){
        setDailyEmotion(type);
    }

    function handleMessage(val: string){
        if(val.length <= 100) setMessage(val);
    }

    function getSurvey(type: string|null){
        switch (type){
            case "verySad": return 1;
            case "sad": return 2;
            case "normal": return 3;
            case "happy": return 4;
            case "veryHappy": return 5;
            default: return 0;
        }
    }

    const saveDiary = async (diary: Diary) =>{
        try{
            console.log(diary)
            const res = await addDiary(diary);
            console.log(res);
        }
        catch(error){
            console.log(error);
        }
    }

    function handleSave(){
        console.log(account);
        if(dailyEmotion!==null){
            const diary:Diary ={
                id:"",
                idUser: account._id,
                date: moment(new Date).format("YYYY-MM-DD"),
                survey: getSurvey(dailyEmotion),
                message: message
            }
            saveDiary(diary);
        }
    }

    return(
        <div className="dailynote">
            <h2>Ngày hôm nay của bạn thế nào?</h2>
            <ul>
                <li className={(dailyEmotion === 'verySad') ? 'select':''} onClick={() => handleSelect("verySad")}>
                    <figure><img src={verySad} alt="" /></figure><p>Rất tệ</p>
                </li>
                <li className={(dailyEmotion === 'sad') ? 'select':''} onClick={() => handleSelect("sad")}>
                    <figure><img src={sad} alt="" /></figure><p>Buồn</p>
                </li>
                <li className={(dailyEmotion === 'normal') ? 'select':''} onClick={() => handleSelect("normal")}>
                    <figure><img src={normal} alt="" /></figure><p>Bình thường</p>
                </li>
                <li className={(dailyEmotion === 'happy') ? 'select':''} onClick={() => handleSelect("happy")}>
                    <figure><img src={happy} alt="" /></figure><p>Vui</p>
                </li>
                <li className={(dailyEmotion === 'veryHappy') ? 'select':''} onClick={() => handleSelect("veryHappy")}>
                    <figure><img src={veryHappy} alt="" /></figure><p>Rất vui</p>
                </li>
            </ul>
            <fieldset>
                <textarea 
                    onChange={(e) => handleMessage(e.target.value)} name="" id="" 
                    placeholder='Nhấn để ghi lại ngày hôm nay của bạn...'
                    value={message}
                ></textarea>
                <p>{message.length}/100</p>
            </fieldset>
            <div onClick={handleSave} className='btn_save'><figure><img src={send_icon} alt="" /></figure><p>Lưu</p></div>
        </div>
    )
}