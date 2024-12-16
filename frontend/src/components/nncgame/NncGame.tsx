import './nncgame.css'
import logo from "./images/image 9.png"
import { useEffect, useState } from 'react'
import { questions } from './questions/question';

interface Question{
    content: string;
    listAns: string[];
    ans: number;
    des: string;
}

export default function NncGame(){
    const [isStart, setIsStart] = useState(false);
    const [total, setTotal] = useState(0);
    const [cur, setCur] = useState(0);
    const letter = ["A", "B", "C", "D"];
    const listQues:Question[] = questions;
    const [curQues, setCurQues] = useState<Question>(listQues[getRandom(listQues.length)]);


    const numbers = Array.from({ length: 11 }, (_, index) => index + 1);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        if (isPaused) return;
        if (timeLeft === 0) {
            setIsStart(false);
            return;
        };
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, isPaused]);

    const formatTime = (time:any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    function handleStart() {
        setIsStart(true);
        setTimeLeft(180);
    }

    function getRandom(max:number) {
        return Math.floor(Math.random() * max);
    }

    function handleAns(index:number, e:React.MouseEvent<HTMLLIElement, MouseEvent>){
        const element = e.target as HTMLLIElement;
        if (element) {
            if (index + 1 === curQues.ans) {
                element.style.backgroundColor = "#2CBA00";
                setCur(cur+1);
                if(cur+1 > total) setTotal(cur+1);
            } else {
                element.style.backgroundColor = "#FF3B30";
                setCur(0);
            }
            setTimeout(() => setIsPaused(true), 1000);
        }
    }

    function handleNext(){
        setCurQues(listQues[getRandom(listQues.length)]);
        setIsPaused(false);
        if(cur === 10) setIsStart(false);
    }

    function handleStop(){
        setIsPaused(false);
        setIsStart(false);
    }

    return (
        !isStart?<div className='nncgame'>
            <figure className='logo'><img src={logo} alt="" /></figure>
            <h3>NHANH NHƯ CHỚP - NHẬN THỨC VỀ SỨC KHỎE TÂM THẦN</h3>
            <p className='rule'>
                <b>Luật chơi:</b> <i>Người chơi lần lượt trả lời các câu hỏi 
                trong thời gian 5 phút điểm số cuối cùng sẽ được 
                tính là tổng số câu trả lời liên tiếp cao nhất. 
                Hãy trả lời thật nhanh và chính xác nhé!</i>
            </p>
            <p className='scort'>Điểm số của bạn: <b>{total}</b></p>
            <p className='start' onClick={handleStart}>BẮT ĐẦU!</p>
        </div>
        :<div className='nncgame ingame'>
            <div className='ques'>
                <div className='content'>
                    <figure><img src={logo} alt="" /></figure>
                    <p>{curQues.content}</p>
                </div>
                {!isPaused?<ul className='ans'>
                    {curQues.listAns.map((value, index) => <li key={index} onClick={(e) => handleAns(index, e)}>
                        <p className='title'>{letter[index]}</p>
                        {value}
                    </li>)}
                </ul>
                :<div className='ans des'>
                    <p><b>Đáp án: </b>{curQues.listAns[curQues.ans-1]}</p>
                    <br />
                    <p className='des'><b>Giải thích: </b><i>{curQues.des}</i></p>
                    <div>
                        <p className='cont' onClick={handleNext}>Tiếp tục</p>
                        <p className='stop' onClick={handleStop}>Kết thúc</p>
                    </div>
                </div>}
            </div>
            <div className='prog'>
                <p className='time'>{formatTime(timeLeft)}</p>
                <p className='total'>{total}</p>
                <div className='prog-main'>
                    {numbers.map(index => <p key={index}>{index-1}</p>)}
                    <p className='cur' style={{bottom: `${cur*41}px`}}>{cur}</p>
                </div>
            </div>
        </div>
    )
}