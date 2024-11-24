import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import moment from "moment";
import { getListDiary } from "../../redux/diary/diary.action";
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
import InforChart from "../../components/infochart/InfoChart";
import add_icon from './images/Add_round_duotone_fill_line.png'
import { DatePicker, Tooltip } from "antd";
import AddDiaryBox from "../../components/diarypage/AddDiaryBox";
import { useOutletContext } from "react-router-dom";
import story_icon from './images/Stat.png';
import grid_icon from './images/darhboard (1).png';
import dayjs from "dayjs";
import addDate_icon from './images/Add_ring_light.png'

export default function DiaryPage(){
    const {setPage}:any = useOutletContext();
    const dispatch = useAppDispatch();
    const account = useAppSelector(state => state.user.user);
    const listDiary = useAppSelector(state => state.diary.listDiary);
    
    const [nowDiary, setNowDiary] = useState<Diary>(initalDiaryState.diary);
    const [backDiary, setBackDiary] = useState<Diary|null>();
    const [nextDiary, setNextDiary] = useState<Diary|null>();
    const [index, setIndex] = useState(0);
    const [openBox, setOpenBox] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [mode, setMode] = useState(true);
    const [time, setTime] = useState(dayjs());
    const [dateChoice, setDateChoice] = useState<string>(dayjs().format("YYYY-MM-DD"));

    useEffect(()=>{
        setPage("diary");
        const fetchData = async ()=>{
            try{
                await dispatch(getListDiary(account._id));
            } catch (error){
                console.log(error);
            }
        }
        if(account._id!=="") fetchData();
        // eslint-disable-next-line
    }, [account])

    useEffect(() => {
        let i = 0;
        const todayNote = listDiary.diarys.find((value, index) => {
            i = index;
            return value.date === moment(new Date()).format("YYYY-MM-DD")
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
        // eslint-disable-next-line
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

    function getListDate(day: dayjs.Dayjs){
        const firstDay = dayjs(day.format("YYYY-MM") + "-01", 'YYYY-MM-DD');
        const daysInMonth = firstDay.daysInMonth();
        const daysList = [];
        for (let day = 1; day <= daysInMonth; day++) {
            daysList.push(firstDay.date(day).format('YYYY-MM-DD'));
            if(firstDay.date(day).format('YYYY-MM-DD') === dayjs().format("YYYY-MM-DD")) day = 32;
        }
        return daysList;
    }

    function findDiary(date: string){
        const find = listDiary.diarys.find(index => index.date === date);
        if(find) return <DiaryBox account={account} diary={find}/>
        else return <div className="dailybox pending">
            <p className="date">{date}</p>
            <figure onClick={() => {setOpenAdd(true); setDateChoice(date)}}><img src={addDate_icon} alt="" /></figure>
        </div>
    }

    return(
        <main className="diarypage" style={{backgroundImage: `url(${getBackground(nowDiary.survey)}`}}>
            <div className="inner">
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <p>Thói quen ghi chú tâm trạng mỗi ngày giúp cho chúng ta có nhận thức hơn về việc quan tâm đến <b>Sức khỏe Tâm thần</b> của bản thân.  </p>
                    <figure><img src={tree_icon} alt="" /></figure>
                    <div className='change-mode' onClick={() => setMode(!mode)}>
                        <figure className='cal' style={mode ? {backgroundColor: "white"}: {}}><img src={story_icon} alt="" /></figure>
                        <figure className='time' style={!mode ? {backgroundColor: "white"}: {}}><img src={grid_icon} alt="" /></figure>
                    </div>
                    {!mode&&<div className="pickDate">
                        <DatePicker mode="month" picker="month" allowClear={false} value={time} onChange={(date) => setTime(date)} maxDate={dayjs()}/>
                    </div>}
                </div>
                {mode?<div className="listDiary">
                    <div className="sub">{ backDiary && <DiaryBox account={account} diary={backDiary}/>}</div>
                    <figure onClick={() => setIndex(index-1)}>{ backDiary && <img src={back_icon} alt="" />}</figure>
                    <div className="main"><DiaryBox account={account} diary={nowDiary}/></div>
                    <figure onClick={() => setIndex(index+1)}>{ nextDiary && <img src={next_icon} alt="" />}</figure>
                    <div className="sub">{ nextDiary && <DiaryBox account={account} diary={nextDiary}/>}</div>
                </div>:
                <div className="gridDiary">
                    <ul>{
                        getListDate(time).map((index) => <li key={index}>
                            {findDiary(index)}
                        </li>)
                    }</ul>
                </div>}
                {!openBox && <p className="see-chart" onClick={() => setOpenBox(true)}>Xem biểu đồ tâm trạng của bạn</p>}
            </div>
            {openBox && <div className="sub-box">
               <InforChart account={account} isOpen={setOpenBox} listDiary={listDiary}/>
            </div>}
            <Tooltip title="Thêm nhật kí mới!">
                <figure onClick={() => setOpenAdd(!openAdd)} className="add-diary"><img src={add_icon} alt="" /></figure>
            </Tooltip>
            {openAdd && <AddDiaryBox account={account} listDiary={listDiary} setOpen={setOpenAdd} dateChoice={dateChoice}/>}
        </main>
    )
}