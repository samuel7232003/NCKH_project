import { useEffect, useState } from 'react';
import './gamepage.css'
import pacman from './images/pacman.png'
import tangbong from './images/tangbong.png'
import ransanmoi from './images/ransanmoi.png'
import xepgach from './images/xepgach.png'
import xepbai from './images/xepbai.png'
import back_icon from "./images/Sign_out_squre.png"
import { Tooltip } from 'antd';
import { useOutletContext } from 'react-router-dom';
import NncGame from '../../components/nncgame/NncGame';
import nnc from './images/image9.png'

export function GamePage(){
    const listGame = ["pacman", "bounce", "snake", "tetris", "spider"];

    const {setPage}:any = useOutletContext();
    const [isPlay, setIsPlay] = useState(false);
    const [curGame, setCurGame] = useState(0);
    const [isNnc, setIsNnc] = useState(false);

    useEffect(() => {
        setPage("game");
        // eslint-disable-next-line
    },[])

    function getiInfor(num: number){
        switch (num){
            case 0: return {img: pacman, name: "Pac-man",  height: "630", width: "540"};
            case 1: return {img: tangbong, name: "Tâng bóng", height: "540", width: "375"};
            case 2: return {img: ransanmoi, name: "Rắn săn mồi", height: "486", width: "591"};
            case 3: return {img: xepgach, name: "Xếp gạch", height: "642", width: "474"};
            default: return {img: xepbai, name: "Xếp bài", height: "700", width: "1000"};
        }
    }

    function handleChoice(num: number){
        if(num!==0) setCurGame(num);
        else setIsNnc(true);
        setIsPlay(true);
    }

    return(
        <main className='gamepage'>
            <div className='inner'>
                {(!isPlay) ? <div>
                    <h2>Trò chơi kiến thức</h2>
                    <ul>
                        <li style={{backgroundImage: `url(${nnc})`}} onClick={() => handleChoice(0)}>
                            <div>
                                <p className='name'>Nhanh như chớp</p>
                            </div>
                        </li>
                    </ul>
                    <h2>Trò chơi giải trí</h2>
                    <ul>
                        {listGame.map((value, index) => 
                            <li style={{backgroundImage: `url(${getiInfor(index).img})`}} key={index} onClick={() => handleChoice(index)}>
                                <div>
                                    <p className='name'>{getiInfor(index).name}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div> :
                <div>
                    {!isNnc?<iframe
                        title="Pac-Man Game"
                        src={`../games-gh-pages/${listGame[curGame]}/index.html`}
                        width={getiInfor(curGame).width}
                        height={getiInfor(curGame).height}
                        style={{ border: 'none' }}
                    />
                    :<NncGame/>}
                    <Tooltip title="Trở lại">
                        <figure className='back' onClick={() => {setIsPlay(false); setIsNnc(false)}}><img src={back_icon} alt="" /></figure>
                    </Tooltip>
                </div>
                }
            </div>
        </main>
    )
}