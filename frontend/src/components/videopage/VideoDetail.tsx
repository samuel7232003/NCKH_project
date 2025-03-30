import YouTube from "react-youtube";
import "./videodetail.css"

interface Props{
  video: any;
  playlist: any;
  setCurVideo: React.Dispatch<React.SetStateAction<null>>;
}

export default function VideoDetail({video, playlist, setCurVideo}:Props){
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return(
    <div className="video-detail">
      <figure className="video-main">
        <YouTube videoId={video.id} opts={opts} />
      </figure>
      <div className="video-list">
        <ul>
          {
            playlist.map((item:any) => video.id !== item.id && <li key={item.id} onClick={() => setCurVideo(item)}>
              <figure><img src={item.urlImage} alt="" /></figure>
              <p>{item.name}</p>
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}