import { useEffect, useState } from 'react'
import './timeline.css'
import edit_icon from '../feelingchart/images/Edit.png'
import { User } from '../../../redux/user/user.state';
import { useAppDispatch, useAppSelector } from '../../../redux/builder';
import { getListDailyTask, removeDailyTask } from '../../../redux/dailyTask/dailyTask.action';
import sleep_icon from './images/Moon_alt_light.png'
import eat_icon from "./images/Pizza_light.png"
import play_icon from "./images/Gamepad_light.png"
import study_icon from "./images/Book_open_alt_light.png"
import work_icon from "./images/Basket_light.png"
import { DailyTask } from '../../../redux/dailyTask/dailyTask.state';
import remove_icon from './images/Trash (1).png'
import { message, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props{
    account: User;
}

export default function Timeline({account}:Props){
    const [listTime, setListTime] = useState(["15h", "16h", "15h", "16h", "15h", "16h", "15h", "16h", "15h"]);
    const dispatch = useAppDispatch();
    const listDailyTask = useAppSelector(state => state.dailyTask.listDailyTask);
    const navigate = useNavigate();

    useEffect(() => {
        const now:number = (new Date()).getHours();
        let list = [""];
        for(let i = 0; i< 9; i++){
            let time = now - (4-i);
            if(time < 0) time = 24 + time;
            if(time > 23) time = 24 - time;
            list[i] = time + "h";
        }
        setListTime([...list]);

        const fetchData = async () =>{
            try {
                if(account._id!=="") await dispatch(getListDailyTask(account._id));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[account])

    function getIcon(type: string){
        switch (type){
            case "sleep": return sleep_icon;
            case "study": return study_icon;
            case "work": return work_icon;
            case "eat": return eat_icon;
            case "play": return play_icon;
            default: return study_icon;
        }
    }

    function getLength(dailyTask:DailyTask){
        const start = parseInt(dailyTask.start.slice(0, 2)) + parseInt(dailyTask.start.slice(-2))/60;
        const end = parseInt(dailyTask.end.slice(0, 2)) + parseInt(dailyTask.end.slice(-2))/60;
        return 64*(end-start);
    }

    function getLeft(start:string){
        const num = parseInt(start.slice(0, 2)) + parseInt(start.slice(-2))/60;
        const now = (new Date()).getHours();
        return 64*(num - now +4);
    }

    function handleDelete(id: string){
        const deteleData = async () => {
            try {
                await dispatch(removeDailyTask(id, account._id));
            } catch (error) {
                console.log(error);
            }
        }
        deteleData();
        message.success("Xóa công việc thành công!")
    }

    return(
        <div className="timeline">
            <div className='grid'>
                {
                    listTime.map((value, index) => 
                        <p key={index} className={(index===4)?'center':""}>{value}</p>
                    )
                }
            </div>
            <div className='value'>
                {(listDailyTask.idUser!=="")&&
                    <ul>
                        {listDailyTask.dailyTasks.map(index => 
                            <Tooltip title={index.content}>
                            <li key={index._id} style={{background:`${index.color}`, 
                                width: `${getLength(index)}px`,
                                left: `${getLeft(index.start)}px`}}> 
                                <figure><img src={getIcon(index.type)} alt="" /></figure>
                                <p>{index.content}</p>
                                <figure className='delete' onClick={() => handleDelete(index._id)}><img src={remove_icon} alt="" /></figure>
                            </li>
                            </Tooltip>
                        )}
                    </ul>
                }
            </div>
            <figure className='edit' onClick={() => navigate("./timetable")}><img src={edit_icon} alt="" /></figure>
        </div>
    )
}