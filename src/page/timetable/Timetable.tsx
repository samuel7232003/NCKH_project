import CalendarMain from '../../components/timetable/calendar/CalendarMain'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (4) 2.png'
import './timetable.css'

export default function Timetable(){
    return(
        <main className="timetable">
            <div>
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <h2>Lịch của bạn</h2>
                    <figure><img src={tree_icon} alt="" /></figure>
                </div>
                <div className='calendar'>
                    <CalendarMain/>
                </div>
            </div>
        </main>
    )
}