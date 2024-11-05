import CalendarMain from '../../components/timetable/calendar/CalendarMain'
import { useAppSelector } from '../../redux/builder'
import tree_icon from './images/Beige Blue Simple Illustrated Study Blog Logo (4) 2.png'
import './timetable.css'

export default function Timetable(){
    const account = useAppSelector(state => state.user.user);

    return(
        account && <main className="timetable">
            <div>
                <div className="title">
                    <figure><img src={tree_icon} alt="" /></figure>
                    <h2>Lịch của bạn</h2>
                    <figure><img src={tree_icon} alt="" /></figure>
                </div>
                <div className='calendar'>
                    <CalendarMain account={account}/>
                </div>
            </div>
        </main>
    )
}