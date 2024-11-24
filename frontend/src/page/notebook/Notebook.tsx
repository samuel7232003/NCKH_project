import image_1 from './notebook/1.jpg'
import image_2 from './notebook/2.jpg'
import image_3 from './notebook/3.jpg'
import image_4 from './notebook/4.jpg'
import image_5 from './notebook/5.jpg'
import image_6 from './notebook/6.jpg'
import image_7 from './notebook/7.jpg'
import image_8 from './notebook/8.jpg'
import image_9 from './notebook/9.jpg'
import image_10 from './notebook/10.jpg'
import image_11 from './notebook/11.jpg'
import image_12 from './notebook/12.jpg'
import image_13 from './notebook/13.jpg'
import image_14 from './notebook/14.jpg'
import image_15 from './notebook/15.jpg'
import image_16 from './notebook/16.jpg'
import image_17 from './notebook/17.jpg'
import image_18 from './notebook/18.jpg'
import image_19 from './notebook/19.jpg'
import image_20 from './notebook/20.jpg'
import image_21 from './notebook/21.jpg'
import image_22 from './notebook/22.jpg'
import { useState } from 'react'
import back_icon from './notebook/left.png'
import next_icon from './notebook/right.png'
import './notebook.css'

export default function Notebook(){
    const pages = [image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10,
        image_11, image_12, image_13, image_14, image_15, image_16, image_17, image_18, image_19, image_20,
        image_21, image_22];
    const [curPage, setCurPage] = useState(0);
    
    return(
        <main className='notebook'>
            <div className='notebook-main'>
                {(curPage>1)?<figure className='back' onClick={() => setCurPage(curPage-2)}><img src={back_icon} alt="" /></figure>:<figure className='back'></figure>}
                <figure className='page'><img src={pages[curPage]} alt="" /></figure>
                <figure className='page'><img src={pages[curPage+1]} alt="" /></figure>
                {(curPage<20)?<figure className='next' onClick={() => setCurPage(curPage+2)}><img src={next_icon} alt="" /></figure>:<figure className='next'></figure>}
            </div>
        </main>
    )
}