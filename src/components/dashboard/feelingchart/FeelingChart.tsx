import { User } from "../../../redux/user/user.state";
import './feelingchart.css'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (4) 1.png'
import edit_icon from './images/Edit.png'
import veryHappy from '../../../image/🦆 emoji _smiling face with heart-shaped eyes_ (1).png'
import happy from '../../../image/🦆 emoji _smiling face with open mouth and smiling eyes_ (1).png'
import normal from '../../../image/🦆 emoji _slightly smiling face_ (1).png'
import sad from '../../../image/🦆 emoji _slightly frowning face_ (1).png'
import verySad from '../../../image/🦆 emoji _loudly crying face_ (1).png'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { getListDiary } from "../../../redux/diary/diary.action";
import moment from "moment";

interface Props{
    account: User
}

export default function FeelingChart({account}:Props){
    const listDiary = useAppSelector(state => state.diary.listDiary);
    const diary = useAppSelector(state => state.diary.diary);
    const dispatch = useAppDispatch()
    const [listSurvey, setListSurvey] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await dispatch(getListDiary(account._id));
            } catch (error){
                console.log(error);
            }
        }
        fetchData();
    },[account])

    useEffect(()=>{
        if(listDiary.idUser!==""){
            let today = new Date;
            let listDate = [moment(today).format("YYYY-MM-DD")];
            const oneDay = 24 * 60 * 60 * 1000;
            for(let i = 0; i<7; i++){
                today = new Date(today.getTime() - oneDay);
                listDate.unshift(moment(today).format("YYYY-MM-DD"));
            }
            const list = listDate.map(index => {
                const dia = listDiary.diarys.find(i => i.date === index);
                if(dia) return dia.survey;
                else return 0;
            });
            setListSurvey([...list]);
        }
    },[listDiary])

    function getVal(num: number|null):React.CSSProperties{
        if(!num) num = 0;
        if(num === -1) num = diary.survey;
        const heightVal = [`4px`, `28px`, `56px`, `84px`, `112px`, `140px`];
        const colorVal = [`#D9D9D9`, `#FF0000`, `#FFA700`, `#FFF400`, `#A3FF00`, `#2CBA00`];
        return {height: heightVal[num], background: colorVal[num]}
    }

    function getDay(num: number){
        const today = (new Date).getDay();
        const nameDay = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
        let index = today-num-1;
        if(index<0) index+=7;
        return nameDay[index]
    }

    return(
        <>
        {
            (listDiary.idUser!=="") &&
            <div className="feelingchart">
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <h2>Biểu đồ tâm trạng</h2>
                    <figure><img src={tree_icon} alt="" /></figure>
                </div>
                <div className="chart">
                    <div className="grid">
                        <figure><img src={veryHappy} alt="" /></figure>
                        <figure><img src={happy} alt="" /></figure>
                        <figure><img src={normal} alt="" /></figure>
                        <figure><img src={sad} alt="" /></figure>
                        <figure><img src={verySad} alt="" /></figure>
                        <figure className="end"><span></span></figure>
                    </div>
                    <div className="value">
                        <div><figure style={getVal(listSurvey[0])}></figure><p>{getDay(7)}</p></div>
                        <div><figure style={getVal(listSurvey[1])}></figure><p>{getDay(6)}</p></div>
                        <div><figure style={getVal(listSurvey[2])}></figure><p>{getDay(5)}</p></div>
                        <div><figure style={getVal(listSurvey[3])}></figure><p>{getDay(4)}</p></div>
                        <div><figure style={getVal(listSurvey[4])}></figure><p>{getDay(3)}</p></div>
                        <div><figure style={getVal(listSurvey[5])}></figure><p>{getDay(2)}</p></div>
                        <div><figure style={getVal(listSurvey[6])}></figure><p>{getDay(1)}</p></div>
                        <div><figure style={getVal(-1)}></figure><p>Hôm nay</p></div>
                    </div>
                </div>
                <figure className="edit"><img src={edit_icon} alt="" /></figure>
            </div>
        }
        </>
    )
}