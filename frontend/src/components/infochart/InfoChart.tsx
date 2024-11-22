import './infochart.css'
import tree_title from '../dashboard/feelingchart/images/Beige Blue Simple Illustrated Study Blog Logo (4) 1.png'
import FeelingChart from '../dashboard/feelingchart/FeelingChart'
import { User } from '../../redux/user/user.state'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (5) 1.png'
import exit_icon from './images/exit_btn.png'
import { useEffect, useState } from 'react'
import { ListDiary } from '../../redux/diary/diary.state'
import moment from 'moment'
import { initalDiaryState } from '../../redux/diary/diary.slice'
import verySad_icon from "../../image/🦆 emoji _loudly crying face_ (1).png"
import sad_icon from "../../image/🦆 emoji _slightly frowning face_ (1).png"
import normal_icon from "../../image/🦆 emoji _slightly smiling face_ (1).png"
import happy_icon from "../../image/🦆 emoji _smiling face with open mouth and smiling eyes_ (1).png"
import veryHappy_icon from "../../image/🦆 emoji _smiling face with heart-shaped eyes_ (1).png"

interface Props{
    account: User;
    isOpen: React.Dispatch<React.SetStateAction<boolean>>;
    listDiary: ListDiary;
}

export default function InforChart({account, isOpen, listDiary}:Props){
    const [cost, setCost] = useState(0);

    function getList(listDiary:ListDiary){
        let today = new Date;
        let listDate = [moment(today).format("YYYY-MM-DD")];
        const oneDay = 24 * 60 * 60 * 1000;
        for(let i = 0; i<7; i++){
            today = new Date(today.getTime() - oneDay);
            listDate.unshift(moment(today).format("YYYY-MM-DD"));
        }
        const list = listDate.map(index => {
            const dia = listDiary.diarys.find(i => i.date === index);
            if(dia) return dia;
            else return initalDiaryState.diary;
        });
        return list;
    }

    function findMostFrequent(list:ListDiary) {
        const arr = getList(list).map(i => i.survey);
        const countMap:number[] = [];
        arr.forEach(num => {
            if(num!==0) countMap[num] = (countMap[num] || 0) + 1;
        });
        let maxCount = 0;
        let mostFrequent = "0";
        for (const num in countMap) {
            if (countMap[num] > maxCount) {
                maxCount = countMap[num];
                mostFrequent = num;
            }
        }
        return parseInt(mostFrequent);
    }

    useEffect(() => {
        let count = 0;
        let sum = 0;
        const list = [...getList(listDiary)];
        for(let i = 0; i < list.length; i++){
            if(list[i].survey!==0){
                count = count + 1;
                sum = sum + list[i].survey*2;
            }
        }
        if(count === 0) setCost(0);
        else setCost(Math.round(sum/count*10)/10);
    }, [listDiary])

    function getIcon(num: number){
        switch (num){
            case 1: return verySad_icon;
            case 2: return sad_icon;
            case 3: return normal_icon;
            case 4: return happy_icon;
            case 5: return veryHappy_icon;
            default : return undefined; 
        }
    }

    return(
        <div className="infochart">
            <div className='box-title'>
                <figure><img src={tree_title} alt="" /></figure>
                <h2>Biểu đồ tâm trạng</h2>
                <figure><img src={tree_title} alt="" /></figure>
            </div>
            <div className='box-main'>
                <div className='box-main-chart'>
                    <FeelingChart account={account}/>
                    <div className='chart-sumary'>
                        <h3>Trong 7 ngày qua:</h3>
                        <p>Chỉ số tâm trạng trung bình: <b><span>{cost}</span>/10</b></p>
                        <div>Tâm trạng phổ biến: <figure><img src={getIcon(findMostFrequent(listDiary))} alt="" /></figure></div>
                    </div>
                </div>
                <div className='box-main-advice'>
                    <h3>Lời khuyên giành cho bạn:</h3>
                    <p className='sum'>Chỉ số tâm trạng trung bình của bạn trong 7 ngày gần nhất là <b>{cost}/10</b>.</p>
                    <p>Bạn là một người thật hạnh phúc trong cuộc sống là có Sức khỏe Tâm thần khỏe mạnh. 
                        Hãy giữ những điều hành phúc ấy nhé và tập biết ơn với mọi người xung quanh vì đã 
                        cho bạn những ngày thật vui vẻ này. <br/>
                        Chúc bạn những ngày tiếp theo thật hạnh phúc!</p>
                    <figure><img src={tree_icon} alt="" /></figure>
                </div>
                <figure className='exit-icon' onClick={() => isOpen(false)}><img src={exit_icon} alt="" /></figure>
            </div>
        </div>
    )
}