import { User } from "../../../redux/user/user.state";
import Timeline from "../../dashboard/timeline/Timeline";
import './timelinemain.css'
import timeline_icon from "./images/Clock.png"
import { ColorPicker, message, Select, TimePicker } from "antd";
import sleep_icon from './images/Moon_alt_light.png'
import eat_icon from "./images/Pizza_light.png"
import play_icon from "./images/Gamepad_light.png"
import study_icon from "./images/Book_open_alt_light.png"
import work_icon from "./images/Basket_light.png"
import dayjs from "dayjs";
import add_icon from "./images/Chat_alt_add.png"
import { useEffect, useState } from "react";
import { DailyTask } from "../../../redux/dailyTask/dailyTask.state";
import { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import { useAppDispatch, useAppSelector } from "../../../redux/builder";
import { addNewDailyTask, getListDailyTask } from "../../../redux/dailyTask/dailyTask.action";

interface Props {
    account: User;
}

export default function TimelineMain({account}:Props){
    const iniTask:DailyTask = {_id:"", idUser:"", content: "", start:"07:00", end:"09:00", type:"study", color:"#16c0e8"};

    const dispatch = useAppDispatch();
    const listDailyTask = useAppSelector(state => state.dailyTask.listDailyTask);
    const [newTask, setNewTask] = useState<DailyTask>(iniTask);
    
    useEffect(() => {
        if(account._id!==""){
            setNewTask({...newTask, idUser: account._id});
            const fetchData = async () => {
                await dispatch(getListDailyTask(account._id));
            }
            fetchData();
        }
    },[account])

    const listHours = () => {
        let list = [];
        for(let i = 0; i< 24; i=i+2) list.push(i);
        list.push(0);
        return list;
    } 

    function handleTime(dates: NoUndefinedRangeValueType<dayjs.Dayjs>|null){
        if(dates && dates[0] && dates[1]){
            setNewTask({...newTask, start: dates[0]?.format("HH:mm"), end: dates[1]?.format("HH:mm")});
        }
        else{
            message.error("Lỗi nhập thời gian!");
        }
    }

    function handleSave(){
        if(newTask.content === ""){
            message.error("Không thể thêm công việc trống!");
        }
        else{
            const addData = async ()=>{
                try {
                    await dispatch(addNewDailyTask(newTask));
                } catch (error) {
                    console.log(error);
                }
            }
            addData();
            message.success("Thêm mới công việc thành công!");
            setNewTask(iniTask);
        }
    }

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

    function getPositon(time: string){
        const num = parseInt(time.slice(0, 2)) + parseInt(time.slice(-2))/60;
        return 20 +22.5+ 22.5*num;
    }

    function getHeight(index:DailyTask){
        const start = parseInt(index.start.slice(0, 2)) + parseInt(index.start.slice(-2))/60;
        const end = parseInt(index.end.slice(0, 2)) + parseInt(index.end.slice(-2))/60;
        return 22.5*(end-start);
    }

    return(
        <div className="timelinemain">
            <div className="timeline-box">
                <ul className="grid">
                    {listHours().map((value, index) => <li key={index}>
                        <p>{value}h</p>
                    </li>)}
                </ul>
                {listDailyTask.idUser!==""&& <ul className="value">
                    {listDailyTask.dailyTasks.map((index:DailyTask) => <li 
                        key={index._id} 
                        style={{backgroundColor: `${index.color}`, top: `${getPositon(index.start)}px`, height: `${getHeight(index)}px`}}>
                        <figure><img src={getIcon(index.type)} alt="" /></figure>
                        <p className="time">{index.start} - {index.end}</p>
                        <p className="content">{index.content}</p>
                    </li>)}
                </ul>}
            </div>
            <div className="add-dailyTask">
                <div className="title">
                    <figure><img src={timeline_icon} alt="" /></figure>
                    <p>Thêm công việc thường ngày</p>
                </div>
                <div className="time">
                    <p>Thời gian</p> 
                    <TimePicker.RangePicker 
                        format={"HH:mm"} minuteStep={15}
                        defaultValue={[dayjs("07:00","HH:mm"), dayjs("09:00", "HH:mm")]}
                        onChange={(dates) => handleTime(dates)}
                    />
                </div>
                <div className="style">
                    <p>Màu:</p> <ColorPicker defaultValue={"#16c0e8"} onChange={(value, css) => setNewTask({...newTask, color: css})}/>
                    <p>Biểu tượng:</p> 
                    <Select
                        options={[
                            {value: "study", label:  <figure><img src={study_icon} alt=""/>Học tập</figure>},
                            {value: "sleep", label: <figure><img src={sleep_icon} alt=""/>Giấc ngủ</figure>},
                            {value: "work", label: <figure><img src={work_icon} alt=""/>Làm việc</figure>},
                            {value: "play", label: <figure><img src={play_icon} alt=""/>Giải trí</figure>},
                            {value: "eat", label: <figure><img src={eat_icon} alt=""/>Ăn uống</figure>}
                        ]}
                        defaultValue={"study"}
                        onChange={(value) => setNewTask({...newTask, type: value})}
                    />
                </div>
                <fieldset>
                    <input type="text" placeholder="Nhập nội dung..." onChange={(e) => setNewTask({...newTask, content:e.target.value})}/>
                    <div className="add" onClick={handleSave}>
                        <figure><img src={add_icon} alt="" /></figure>
                        <p>Thêm ngay</p>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}