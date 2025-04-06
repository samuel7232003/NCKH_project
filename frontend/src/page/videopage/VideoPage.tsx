import tree_icon from "./images/Beige Blue Simple Illustrated Study Blog Logo (4) 1 (1).png";
import podcast_icon from "./images/Books.png";
import { listPodcast, listCartoon } from "./data/data";
import "./videopage.css";
import { useEffect, useState } from "react";
import VideoDetail from "../../components/videopage/VideoDetail";
import { useOutletContext } from "react-router-dom";

export default function VideoPage() {
  const [mode, setMode] = useState(false);
  const [curVideo, setCurVideo] = useState(null);
  const [curPlaylist, setCurPlaylist] = useState<any[]>([]);
  const {setPage}:any = useOutletContext();

  useEffect(() =>{
    setPage("video");
  },[])

  function handleChoice(video: any, numPlaylist: number) {
    setMode(true);
    setCurVideo(video);
    if (numPlaylist === 1) {
      setCurPlaylist(listPodcast);
    }
    else if (numPlaylist === 2) {
      setCurPlaylist(listCartoon);
    }
  }

  return (
    <main className="video-page">
      <div className="inner">
        <div className="video-page-title">
          <figure>
            <img src={tree_icon} alt="" />
          </figure>
          <p>Hiểu Để Yêu Thương Channel</p>
          <figure>
            <img src={tree_icon} alt="" />
          </figure>
        </div>
        {!mode ? (
          <div className="video-page-main">
            <div className="main-part">
              <p className="main-part-title">
                <img src={podcast_icon} alt="" />
                Postcast Lắng nghe Tâm hồn
              </p>
              <ul className="main-part-list">
                {listPodcast.map((item: any) => (
                  <li onClick={() => handleChoice(item, 1)} key={item.id}>
                    <figure>
                      <img src={item.urlImage} alt="" />
                    </figure>
                    <div>
                      <p>{item.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="main-part">
              <p className="main-part-title">
                <img src={podcast_icon} alt="" />
                Phim hoạt hình
              </p>
              <ul className="main-part-list">
                {listCartoon.map((item: any) => (
                  <li onClick={() => handleChoice(item, 2)} key={item.id}>
                    <figure>
                      <img src={item.urlImage} alt="" />
                    </figure>
                    <div>
                      <p>{item.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="video-page-main">
            <VideoDetail
              video={curVideo}
              playlist={curPlaylist}
              setCurVideo={setCurVideo}
            />
          </div>
        )}
      </div>
    </main>
  );
}
