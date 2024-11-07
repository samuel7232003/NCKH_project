import { User } from '../../../redux/user/user.state';
import './calendarbox.css'
import edit_icon from './images/Edit (1).png'
import calendar_icon from './images/Calendar_light (1).png'
import { Calendar } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/builder';
import { useEffect } from 'react';
import { getListTask } from '../../../redux/task/task.action';
import home_icon from './images/Home_duotone.png'
import school_icon from './images/Basket.png'
import ousside_icon from './images/Map.png'
import { useNavigate } from 'react-router-dom';

interface Props{
    account: User;
}

export default function Calendarbox({account}:Props){
    const listTask = useAppSelector(state => state.task.listTask);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if(account._id!=="") dispatch(getListTask(account._id));
        }
        fetchData();
    }, [account])

    function getTypeStyle(type: string){
        switch (type){
            case "home": return {icon: home_icon, content: "Nhà", color: "#7AB2D3"};
            case "school": return {icon: school_icon, content: "Trường", color: "#FFBF61"};
            default: return {icon: ousside_icon, content: "Bên ngoài", color: "#9B7EBD"};
        }
    }

    return(
        <div className="calendarbox">
            <div className='title'>
                <figure><img src={calendar_icon} alt="" /></figure>
                <p>Todo-list của bạn</p>
            </div>
            <div className='calendar'>
                <Calendar fullscreen={false}/>
            </div>
            <ul className='todo-list'>
                {listTask.tasks.map((value,index) => 
                    <li key={index} style={{background:`${getTypeStyle(value.type).color}`}}>
                        <p style={{color:`${getTypeStyle(value.type).color}`}} className='datenum'>{value.date.slice(-2)}</p>
                        <div>
                            <div className='li-top'>
                                <div className='task-type'>
                                    <figure><img src={getTypeStyle(value.type).icon} alt="" /></figure>
                                    <p>{getTypeStyle(value.type).content}</p>
                                </div>
                                <p className='time'>{value.time} Thứ {new Date(value.date).getDay() + 1}, {value.date}</p>
                            </div>
                            <p className='content'>{value.content}</p>
                        </div>
                    </li>
                )}
            </ul>
            <figure onClick={() => navigate("./timetable")} className='edit'><img src={edit_icon} alt="" /></figure>
        </div>
    )
}