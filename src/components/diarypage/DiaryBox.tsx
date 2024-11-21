import { Diary } from "../../redux/diary/diary.state";
import verySad from '../../image/🦆 emoji _loudly crying face_ (1).png'
import sad from '../../image/🦆 emoji _slightly frowning face_ (1).png'
import normal from '../../image/🦆 emoji _slightly smiling face_ (1).png'
import happy from '../../image/🦆 emoji _smiling face with open mouth and smiling eyes_ (1).png'
import veryHappy from '../../image/🦆 emoji _smiling face with heart-shaped eyes_ (1).png'
import { useEffect, useState } from "react";
import normal_img from '../../image/normal_img.jpg'
import verySad_img from '../../image/verySad_img.jpg'
import sad_img from '../../image/sad_img.jpg'
import happy_img from '../../image/happy_img.jpg'
import veryHappy_img from '../../image/veryHappy_img.jpg'
import { User } from "../../redux/user/user.state";
import { removeDiary } from "../../service/diaryService";
import remove_icon from '../dashboard/dailynote/images/Trash.png'
import { initalDiaryState } from "../../redux/diary/diary.slice";
import './diarybox.css'
import { useAppDispatch } from "../../redux/builder";
import { getListDiary } from "../../redux/diary/diary.action";

interface Props{
    diary: Diary;
    account: User;
}

export default function DiaryBox({diary, account}:Props){
    const dispatch = useAppDispatch();
    const [nowDiary, setNowDiary] = useState<Diary>(diary);

    useEffect(() => {
        setNowDiary(diary);
    },[diary])

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

    function handleRemove(e: React.MouseEvent<HTMLElement, MouseEvent>){
        e.stopPropagation();
        const remove = async () => {
            try{
                await removeDiary(account._id, nowDiary.date!);
                await dispatch(getListDiary(account._id));
            } catch (error){
                console.log(error);
            }
        }
        remove();
        setNowDiary(initalDiaryState.diary);
    }

    return (
        <div className="dailybox done" style={{backgroundImage: `url(${getIcon(nowDiary.survey).bg})`}}>
            <p className='date' style={getIcon(nowDiary.survey).theme === "white" ? {color: `#fff`}:undefined}>{nowDiary.date}</p>
            <figure className='icon'><img src={getIcon(nowDiary.survey).icon} alt="" /></figure>
            <p className='emo' style={getIcon(nowDiary.survey).theme === "white" ? {color: `#fff`}:undefined}>{getIcon(nowDiary.survey).title}</p>
            {nowDiary.message !=="" && <p className='message'>{nowDiary.message}</p>}
            <figure onClick={(e) => handleRemove(e)} className='remove'><img src={remove_icon} alt="" /></figure>
        </div>
    )
}