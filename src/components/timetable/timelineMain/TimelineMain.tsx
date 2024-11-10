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
import { useAppDispatch } from "../../../redux/builder";
import { addNewDailyTask } from "../../../redux/dailyTask/dailyTask.action";

interface Props {
    account: User;
}

export default function TimelineMain({account}:Props){
    const iniTask:DailyTask = {_id:"", idUser:"", content: "", start:"07:00", end:"09:00", type:"study", color:"#16c0e8"}
    const [newTask, setNewTask] = useState<DailyTask>(iniTask);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setNewTask({...newTask, idUser: account._id});
    },[account])

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

    return(
        <div className="timelinemain">
            <Timeline account={account}/>
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