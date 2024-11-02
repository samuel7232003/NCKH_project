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
import { getListDiary, setDiary } from "../../../redux/diary/diary.action";
import moment from "moment";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

interface Props{
    account: User
}

export default function FeelingChart({account}:Props){
    const listDiary = useAppSelector(state => state.diary.listDiary);
    const diary = useAppSelector(state => state.diary.diary);
    const dispatch = useAppDispatch()
    const [listSurvey, setListSurvey] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const count = [7, 6, 5, 4, 3, 2, 1]
    const navigate = useNavigate();

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

            const todayDiary = listDiary.diarys.find(index => index.date === moment(new Date()).format("YYYY-MM-DD"));
            if(todayDiary) dispatch(setDiary(todayDiary));
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

    function getDate(num: number){
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const date = new Date(today.getTime() - num*oneDay);
        return moment(date).format("DD-MM");
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
                        {
                            count.map(index => 
                                <Tooltip key={index} title={getDate(index)}><div><figure style={getVal(listSurvey[7-index])}></figure><p>{getDay(index)}</p></div></Tooltip>
                            )
                        }
                        <Tooltip title={getDate(0)}><div><figure style={getVal(-1)}></figure><p>Hôm nay</p></div></Tooltip>
                    </div>
                </div>
                <figure onClick={() => navigate('./diarypage')} className="edit"><img src={edit_icon} alt="" /></figure>
            </div>
        }
        </>
    )
}