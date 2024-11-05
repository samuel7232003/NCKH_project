import { Badge, BadgeProps, Calendar, CalendarProps } from 'antd'
import './calendarmain.css'
import { Dayjs } from 'dayjs';
import list_icon from './images/Arhives_alt.png'

export default function CalendarMain(){

    const getListData = (value: Dayjs) => {
        let listData: { type: string; content: string }[] = []; // Specify the type of listData
        switch (value.date()) {
          case 8:
            listData = [
              
            ];
            break;
          default:
        }
        return listData || [];
      };
      
      const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
          return 1394;
        }
      };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      };
    
      const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map((item) => (
              <li key={item.content}>
                <Badge status={item.type as BadgeProps['status']} text={item.content} />
              </li>
            ))}
          </ul>
        );
      };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };

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
                    <li>
                        <p className='datenum'>10</p>
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
                    <li>
                        <p className='datenum'>10</p>
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
                    <li>
                        <p className='datenum'>10</p>
                        <div>
                            <p className='time'>20:00 Thứ 3, 15/11/2024</p>
                            <p className='content'>Bài tập Giải tích</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}