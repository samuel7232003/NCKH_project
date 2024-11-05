import { Calendar, CalendarProps, DatePicker, message, Select, TimePicker, Tooltip } from 'antd'
import './calendarmain.css'
import { Dayjs } from 'dayjs';
import list_icon from './images/Arhives_alt.png'
import { User } from '../../../redux/user/user.state';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/builder';
import { addNewTask, getListTask } from '../../../redux/task/task.action';
import home_icon from './images/Home_duotone.png'
import school_icon from './images/Basket.png'
import ousside_icon from './images/Map.png'
import { Task } from '../../../redux/task/task.state';
import add_icon from './images/Chat_plus (1).png'
import remove_icon from './images/Trash (1).png'
import addmain_icon from './images/Chat_plus (2).png'
import { initialTaskState } from '../../../redux/task/task.slice';

interface Props{
    account: User
}

export default function CalendarMain({account}:Props){
    const dispatch = useAppDispatch();
    const listTask = useAppSelector(state => state.task.listTask);
    const [openAddBox, setOpenAddBox] = useState(false);
    const [newTask, setNewTask] = useState<Task>({_id:"", idUser: account._id, time: "", date: "", type: "home", content:""});

    useEffect(() => {
        const fetchData = async () => {
            if(account._id!=="") dispatch(getListTask(account._id));
        }
        fetchData();
    }, [account])

    const getListData = (value: Dayjs) => {
        let listData_:Task[] = listTask.tasks.filter(index => index.date === value.format("YYYY-MM-DD"));
        let listData:string[] = listData_.map(index => index.type);
        return listData || [];
      };
    
    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index} style={{border: `${getTypeStyle(item).color} solid 2px`}}>
                        <figure><img src={getTypeStyle(item).icon} alt="" /></figure>
                        <p>{getTypeStyle(item).content}</p>
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    function getTypeStyle(type: string){
        switch (type){
            case "home": return {icon: home_icon, content: "Nhà", color: "#2CBA00"};
            case "school": return {icon: school_icon, content: "Trường", color: "#16C0E8"};
            default: return {icon: ousside_icon, content: "Bên ngoài", color: "#FFC600"};
        }
    }

    function handleSave(){
        const add = async () =>{
            const res = await dispatch(addNewTask(newTask));
        }
        add();
        setOpenAddBox(false);
        message.success("Thêm công việc mới thành công!")
    }

    return(
        <div className='calendarmain'>
            <div className="calendarCpn">
                <Calendar style={{height: "100%", overflow: "auto"}} cellRender={cellRender}/>
            </div>
            <div className="todolist">
                <div className='todo-title'>
                    <figure><img src={list_icon} alt="" /></figure>
                    <h3>Todo-list của bạn</h3>
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
                            <div className='addBtn'>
                            <figure className='removeTask'><img src={remove_icon} alt="" /></figure>
                        </div>
                        </li>
                    )}
                </ul>
                {openAddBox ?
                <div className='addTask'>
                    <div className='li-top'>
                        <Select
                            defaultValue="home"
                            options ={[
                                {value: "home", label: <div className='task-type'> <figure><img src={home_icon} alt="" /></figure><p>Nhà</p></div>},
                                {value: "school", label: <div className='task-type'> <figure><img src={school_icon} alt="" /></figure><p>Trường</p></div>},
                                {value: "outsite", label: <div className='task-type'> <figure><img src={ousside_icon} alt="" /></figure><p>Bên ngoài</p></div>}
                            ]}
                            onChange={(e) => setNewTask({...newTask, type: e})}
                        />
                        <div className='time'>
                            <TimePicker format={"HH:mm"} onChange={e => setNewTask({...newTask, time: e.format("HH:mm")})}/>
                            <DatePicker onChange={e => setNewTask({...newTask, date: e.format("YYYY-MM-DD")})}/>
                        </div>
                    </div>
                    <div className='li-bot'>
                        <input onChange={e => setNewTask({...newTask, content: e.target.value.trim()})} className='addContent' type='text' placeholder='Nhập việc cần làm...'/>
                        <div className='addBtn'>
                            <figure onClick={handleSave}><img src={add_icon} alt="" /></figure>
                        </div>
                        <div className='addBtn'>
                            <figure onClick={() => setOpenAddBox(false)}><img src={remove_icon} alt="" /></figure>
                        </div>
                    </div>
                </div>
                : <Tooltip title="Thêm một công việc mới">
                    <figure onClick={() => setOpenAddBox(true)} className='openBtn'><img src={addmain_icon} alt="" /></figure>
                </Tooltip>
                }
            </div>
        </div>
    )
}