import { User } from '../../../redux/user/user.state';
import './calendarbox.css'
import edit_icon from './images/Edit (1).png'
import calendar_icon from './images/Calendar_light (1).png'
import { Calendar } from 'antd';

interface Props{
    account: User;
}

export default function Calendarbox({account}:Props){
    return(
        <div className="calendarbox">
            <div className='title'>
                <figure><img src={calendar_icon} alt="" /></figure>
                <p>Todo-list của bạn</p>
            </div>
            <div className='calendar'>
                <Calendar fullscreen={false}/>
            </div>
            <ul>
                <li>
                    <p className='datenum'>15</p>
                    <div>
                        <p className='time'>20:00 Thứ 3, 15/11/2024</p>
                        <p className='content'>Bài tập Giải tích</p>
                    </div>
                </li>
                <li>
                    <p className='datenum'>8</p>
                    <div>
                        <p className='time'>20:00 Thứ 3, 15/11/2024</p>
                        <p className='content'>Bài tập Giải tích</p>
                    </div>
                </li>
                <li>
                    <p className='datenum'>10</p>
                    <div>
                        <p className='time'>20:00 Thứ 3, 15/11/2024</p>
                        <p className='content'>Bài tập Giải tích</p>
                    </div>
                </li>
            </ul>
            <figure className='edit'><img src={edit_icon} alt="" /></figure>
        </div>
    )
}