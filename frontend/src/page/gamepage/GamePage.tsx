import { useEffect, useState } from "react";
import "./gamepage.css";
import pacman from "./images/pacman.png";
import tangbong from "./images/tangbong.png";
import ransanmoi from "./images/ransanmoi.png";
import xepgach from "./images/xepgach.png";
import xepbai from "./images/xepbai.png";
import back_icon from "./images/Sign_out_squre.png";
import { Tooltip } from "antd";
import { useOutletContext } from "react-router-dom";

export function GamePage() {
  const listGame = ["pacman", "bounce", "snake", "tetris", "spider"];

  const { setPage }: any = useOutletContext();
  const [isPlay, setIsPlay] = useState(false);
  const [curGame, setCurGame] = useState(0);

  useEffect(() => {
    setPage("game");
    // eslint-disable-next-line
  }, []);

  function getiInfor(num: number) {
    switch (num) {
      case 0:
        return { img: pacman, name: "Pac-man", height: "630", width: "540" };
      case 1:
        return {
          img: tangbong,
          name: "Tâng bóng",
          height: "540",
          width: "375",
        };
      case 2:
        return {
          img: ransanmoi,
          name: "Rắn săn mồi",
          height: "486",
          width: "591",
        };
      case 3:
        return { img: xepgach, name: "Xếp gạch", height: "642", width: "474" };
      default:
        return { img: xepbai, name: "Xếp bài", height: "700", width: "1000" };
    }
  }

  function handleChoice(num: number) {
    setCurGame(num);
    setIsPlay(true);
  }

  return (
    <main className="gamepage">
      <div className="inner">
        {!isPlay ? (
          <div>
            <ul>
              {listGame.map((value, index) => (
                <li
                  style={{ backgroundImage: `url(${getiInfor(index).img})` }}
                  key={index}
                  onClick={() => handleChoice(index)}
                >
                  <div>
                    <p className="name">{getiInfor(index).name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <iframe
              title="Pac-Man Game"
              src="/games-gh-pages/bounce/index.html"
              width={getiInfor(curGame).width}
              height={getiInfor(curGame).height}
              style={{ border: "none" }}
            />
            <Tooltip title="Trở lại">
              <figure className="back" onClick={() => setIsPlay(false)}>
                <img src={back_icon} alt="" />
              </figure>
            </Tooltip>
          </div>
        )}
      </div>
    </main>
  );
}
