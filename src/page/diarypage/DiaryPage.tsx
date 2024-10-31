import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import moment from "moment";
import { getListDiary, setDiary } from "../../redux/diary/diary.action";
import DiaryBox from "../../components/diarypage/DiaryBox";
import next_icon from "./images/right.png"
import back_icon from './images/left.png'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (4) 1 (1).png'
import './diarypage.css'
import normal_img from '../../image/normal_img.jpg'
import verySad_img from '../../image/verySad_img.jpg'
import sad_img from '../../image/sad_img.jpg'
import happy_img from '../../image/happy_img.jpg'
import veryHappy_img from '../../image/veryHappy_img.jpg'
import bg_img from '../../image/background.png'
import { Diary } from "../../redux/diary/diary.state";
import { initalDiaryState } from "../../redux/diary/diary.slice";


export default function DiaryPage(){
    const account = useAppSelector(state => state.user.user);
    const listDiary = useAppSelector(state => state.diary.listDiary);
    const dispatch = useAppDispatch();
    const [nowDiary, setNowDiary] = useState<Diary>(initalDiaryState.diary);
    const [backDiary, setBackDiary] = useState<Diary|null>();
    const [nextDiary, setNextDiary] = useState<Diary|null>();
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await dispatch(getListDiary(account._id));
            } catch (error){
                console.log(error);
            }
        }
        if(account._id!=="") fetchData();
    }, [account])

    useEffect(() => {
        let i = 0;
        const todayNote = listDiary.diarys.find((value, index) => {
            i = index;
            return value.date === moment(new Date).format("YYYY-MM-DD")
        });
        setIndex(i);
        if(todayNote) setNowDiary(todayNote);
        const back = listDiary.diarys[i-1];
        if(back) setBackDiary(back)
    }, [listDiary])

    useEffect(() => {
        const now = listDiary.diarys[index];
        if(now) setNowDiary(now);
        const back = listDiary.diarys[index-1];
        if(back) setBackDiary(back);
        else setBackDiary(null);
        const next = listDiary.diarys[index + 1];
        if(next) setNextDiary(next);
        else setNextDiary(null);
    }, [index])

    function getBackground(num:number){
        switch (num){
            case 1: return verySad_img;
            case 2: return sad_img;
            case 3: return normal_img;
            case 4: return happy_img;
            case 5: return veryHappy_img;
            default: return bg_img;
        }
    }

    return(
        <main className="diarypage" style={{backgroundImage: `url(${getBackground(nowDiary.survey)}`}}>
            <div className="inner">
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <p>Thói quen ghi chú tâm trạng mỗi ngày giúp cho chúng ta có nhận thức hơn về việc quan tâm đến <b>Sức khỏe Tâm thần</b> của bản thân.  </p>
                    <figure><img src={tree_icon} alt="" /></figure>
                </div>
                <div className="listDiary">
                    <div className="sub">{ backDiary && <DiaryBox account={account} diary={backDiary}/>}</div>
                    <figure onClick={() => setIndex(index-1)}>{ backDiary && <img src={back_icon} alt="" />}</figure>
                    <div className="main"><DiaryBox account={account} diary={nowDiary}/></div>
                    <figure onClick={() => setIndex(index+1)}>{ nextDiary && <img src={next_icon} alt="" />}</figure>
                    <div className="sub">{ nextDiary && <DiaryBox account={account} diary={nextDiary}/>}</div>
                </div>
                <p className="see-chart">Xem biểu đồ tâm trạng của bạn</p>
            </div>
        </main>
    )
}