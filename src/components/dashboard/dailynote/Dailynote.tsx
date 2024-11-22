import verySad from '../../../image/🦆 emoji _loudly crying face_ (1).png'
import sad from '../../../image/🦆 emoji _slightly frowning face_ (1).png'
import normal from '../../../image/🦆 emoji _slightly smiling face_ (1).png'
import happy from '../../../image/🦆 emoji _smiling face with open mouth and smiling eyes_ (1).png'
import veryHappy from '../../../image/🦆 emoji _smiling face with heart-shaped eyes_ (1).png'
import send_icon from './images/Send_fill.png'
import remove_icon from './images/Trash.png'
import normal_img from '../../../image/normal_img.jpg'
import verySad_img from '../../../image/verySad_img.jpg'
import sad_img from '../../../image/sad_img.jpg'
import happy_img from '../../../image/happy_img.jpg'
import veryHappy_img from '../../../image/veryHappy_img.jpg'
import './dailynote.css'
import { useEffect, useState } from 'react'
import { User } from '../../../redux/user/user.state'
import { useAppDispatch, useAppSelector } from '../../../redux/builder'
import { getListDiary, setDiary } from '../../../redux/diary/diary.action'
import { addDiary, removeDiary } from '../../../service/diaryService'
import { Diary } from '../../../redux/diary/diary.state'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface Props{
    account: User
    type: string
}

export default function Dailynote({account, type}: Props){
    const [dailyEmotion, setDailyEmotion] = useState<string|null>(null);
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();
    const listDiary = useAppSelector(state => state.diary.listDiary);
    const diary = useAppSelector(state => state.diary.diary);
    const navigate = useNavigate();

    useEffect(() =>{
        const fectchData = async () =>{
            if(account._id !== "") await dispatch(getListDiary(account._id));
        }
        fectchData()
        // eslint-disable-next-line
    }, [account]);

    useEffect(() => {
        const todayNoteData = listDiary.diarys.find(index => index.date === moment(new Date()).format("YYYY-MM-DD"));
        if(todayNoteData) dispatch(setDiary(todayNoteData));
        // eslint-disable-next-line
    }, [listDiary])

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

    function getIcon(num : number){
        switch (num){
            case 1: return {icon: verySad, title: "Rất buồn", bg: verySad_img, theme: "white"};
            case 2: return {icon: sad, title: "Buồn bã", bg: sad_img, theme: "white"};
            case 3: return {icon: normal, title: "Bình thường", bg: normal_img, theme: "black"};
            case 4: return {icon: happy, title: "Vui vẻ", bg: happy_img, theme: "black"};
            case 5: return {icon: veryHappy, title: "Rất vui", bg: veryHappy_img, theme: "white"};
            default: return {icon: undefined, title: "", bg: undefined, theme:""};
        }
    }

    const saveDiary = async (diary: Diary) =>{
        try{
            await addDiary(diary);
        }
        catch(error){
            console.log(error);
        }
    }

    function handleSave(){
        if(dailyEmotion!==null){
            const diary:Diary ={
                _id:"",
                idUser: account._id,
                date: moment(new Date()).format("YYYY-MM-DD"),
                survey: getSurvey(dailyEmotion),
                message: message
            }
            saveDiary(diary);
            dispatch(setDiary(diary));
        }
    }

    function handleRemove(e: React.MouseEvent<HTMLElement, MouseEvent>){
        e.stopPropagation();
        const remove = async () => {
            try{
                await removeDiary(account._id, diary.date!);
            } catch (error){
                console.log(error);
            }
        }
        remove();
        dispatch(setDiary(null));
    }

    function handleClick(){
        if(type==="today") navigate("./diarypage");
    }

    return(
        (diary.date==="") ?
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
            :
            <div className="dailynote done" style={{backgroundImage: `url(${getIcon(diary.survey).bg})`}} onClick={handleClick}>
                <p className='date' style={getIcon(diary.survey).theme === "white" ? {color: `#fff`}:undefined}>{diary.date}</p>
                <figure className='icon'><img src={getIcon(diary.survey).icon} alt="" /></figure>
                <p className='title' style={getIcon(diary.survey).theme === "white" ? {color: `#fff`}:undefined}>{getIcon(diary.survey).title}</p>
                {diary.message !== "" && <p className='message'>{diary.message}</p>}
                <figure onClick={(e) => handleRemove(e)} className='remove'><img src={remove_icon} alt="" /></figure>
            </div>
    )
}