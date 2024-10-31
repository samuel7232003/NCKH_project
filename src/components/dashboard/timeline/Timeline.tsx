import { useState } from 'react'
import './timeline.css'
import edit_icon from '../feelingchart/images/Edit.png'

export default function Timeline(){
    const [listTime, setListTime] = useState(["15h", "16h", "15h", "16h", "15h", "16h", "15h", "16h", "15h"]);

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

            </div>
            <figure className='edit'><img src={edit_icon} alt="" /></figure>
        </div>
    )
}