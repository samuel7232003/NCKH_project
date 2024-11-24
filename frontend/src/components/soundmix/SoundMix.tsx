import { useEffect, useRef, useState } from "react";
import './soundmix.css';
import soundmix_icon from './images/Music.png'
import rain_icon from './images/Rain.png'
import fire_icon from './images/Calories.png'
import forest_icon from './images/Carbs.png'
import wind_icon from './images/wind-01.png'
import coffee_icon from './images/coffee.png'
import piano_icon from './images/Sound.png'
import play_icon from './images/Play_fill.png'
import stop_icon from './images/Stop_fill.png'
import rain_au from './sounds/rain.mp3'
import fire_au from './sounds/fire.mp3'
import forest_au from './sounds/forest.mp3'
import wind_au from './sounds/wind.mp3'
import coffee_au from './sounds/coffee.mp3'
import piano_au from './sounds/piano.mp3'
import { Tooltip } from "antd";

export default function SoundMix(){
    const [isPlay, setIsPlay] = useState(false);
    const listSound = ["rain", "fire", "forest", "wind", "coffee", "piano"];
    const [listVol, setListVol] = useState([0.06, 0.09, 0, 0, 0.23, 0.37]);

    const rain = useRef<HTMLAudioElement | null>(null);
    const fire = useRef<HTMLAudioElement | null>(null);
    const forest = useRef<HTMLAudioElement | null>(null);
    const wind = useRef<HTMLAudioElement | null>(null);
    const coffee = useRef<HTMLAudioElement | null>(null);
    const piano = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        for(let i of listSound){
            const s = getSound(i)?.ref.current;
            if(s) s.volume = listVol[listSound.indexOf(i)];
        }
        const localVol = localStorage.getItem("listVol");
        if(localVol) setListVol(JSON.parse(localVol));
        else localStorage.setItem("listVol", JSON.stringify(listVol));
    },[])

    useEffect(() => {
        if (!isPlay) {
            for(let i of listSound){
                const s = getSound(i)?.ref.current;
                if(s) s.pause();
            }
        } else {
            for(let i of listSound){
                const s = getSound(i)?.ref.current;
                if(s){
                    s.play();
                    s.volume = listVol[listSound.indexOf(i)];
                }
            }
        }
    }, [isPlay])

    function handleChangeVol (event: React.ChangeEvent<HTMLInputElement>, name:string) {
        const newVolume = parseFloat(event.target.value)/100;
        const sound = getSound(name)?.ref.current;
        const ind = listSound.indexOf(name);
        const newList = listVol.map((value, index) => (ind === index) ? newVolume : value);
        setListVol([...newList]);
        if (sound) {
            sound.volume = newList[ind];
        }
        localStorage.setItem("listVol", JSON.stringify(newList));
      };

    function getSound(name:string){
        switch (name){
            case "rain": return {ref: rain, src: rain_au, icon: rain_icon};
            case "fire": return {ref: fire, src: fire_au, icon: fire_icon};
            case "forest": return {ref: forest, src: forest_au, icon: forest_icon};
            case "wind": return {ref: wind, src: wind_au, icon: wind_icon};
            case "coffee": return {ref: coffee, src: coffee_au, icon: coffee_icon};
            case "piano": return {ref: piano, src: piano_au, icon: piano_icon}
        }
    }

    return(
        <div className="soundmix">
            <ul>
                {listSound.map(index =>
                    <li key={index}>
                        <div className="icon"><figure><img src={getSound(index)?.icon} alt="" /></figure></div>
                        <fieldset><input type="range" onChange={(e) => handleChangeVol(e, index)} value={listVol[listSound.indexOf(index)]*100}/></fieldset>
                    </li>
                )}
                
            </ul>
            <div className="main" onClick={() => setIsPlay(!isPlay)}>
                <Tooltip title="Nhấn để phát nhạc" placement="bottom">
                    {isPlay?<figure className="noneHover ani"><img src={soundmix_icon} alt="" /></figure>
                    :<figure className="noneHover"><img src={soundmix_icon} alt="" /></figure>}
                    <figure className="hover"><img src={isPlay?stop_icon:play_icon} alt="" /></figure>
                </Tooltip>
            </div>
            {listSound.map(index => <audio key={index} ref={getSound(index)?.ref} src={getSound(index)?.src} loop={true}/>)}
        </div>
    )
}