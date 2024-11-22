import { useEffect, useState } from 'react';
import CalendarMain from '../../components/timetable/calendar/CalendarMain'
import TimelineMain from '../../components/timetable/timelineMain/TimelineMain';
import { useAppSelector } from '../../redux/builder'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (4) 2.png'
import './timetable.css'
import cal_icon from './images/Date_range_light (1).png'
import time_icon from './images/Alarmclock_light.png'
import { useOutletContext } from 'react-router-dom';

export default function Timetable(){
    const {setPage}:any = useOutletContext();
    const account = useAppSelector(state => state.user.user);
    const [calMode, setCalMode] = useState(true);

    useEffect(() => {
        setPage("timetable");
        // eslint-disable-next-line
    },[account])

    return(
        account && <main className="timetable">
            <div>
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <h2>Lịch của bạn</h2>
                    <figure><img src={tree_icon} alt="" /></figure>
                    <div className='change-mode' onClick={() => setCalMode(!calMode)}>
                        <figure className='cal' style={calMode ? {backgroundColor: "white"}: {}}><img src={cal_icon} alt="" /></figure>
                        <figure className='time' style={!calMode ? {backgroundColor: "white"}: {}}><img src={time_icon} alt="" /></figure>
                    </div>
                </div>
                {calMode?<div className='calendar'>
                    <CalendarMain account={account}/>
                </div>:
                <div className='timeline-main'>
                    <TimelineMain account={account}/>
                </div>}
            </div>
        </main>
    )
}