import React, { useState } from "react";
import { images } from "../../contstans";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import "./DetailMovies.scss";

const DetailMovies = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const vidRef = React.useRef();

  const handleVideo = () => {
    setPlayVideo((prevPlayVideo) => !prevPlayVideo);

    if (playVideo) {
      vidRef.current.pause();
    } else {
      vidRef.current.play();
    }
  };
  return (
    <div className="app__detail-movies">
      <div className="detail__video-movies">
        <video src={images.video} ref={vidRef} type="video/mp4" loop controls={false} muted />
        <div className="app__video-overlay flex__center">
          <div className="app__video-overlay_circle flex__center" onClick={handleVideo}>
            {playVideo ? <BsPauseFill color="#fff" fontSize={30} /> : <BsFillPlayFill color="#fff" fontSize={30} />}
          </div>
        </div>
      </div>
      <div className="app__detail-info-movies">
        <div className="detail__image-movies">
          <img src={images.movie5} alt="detail-series" />
        </div>
        <div className="detail__image-info-movies">
          <h2 className="app__title head-text">Judul Film</h2>
          <span className="detail_year">2019</span>
          <span className="detail_category-text">Movies</span>
          <p className="app__detail-desc">
            Money Heist is a crime drama on Netflix - originally called La Casa de Papel. Money Heist season 3 has just been released by the streaming service. The plot reads: "Eight thieves take hostages and lock themselves in the Royal
            Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."
          </p>
        </div>
        <div className="app__detail-inplay-movies">
          <video src={images.video} />
          <span>Money Heist : Episode 1</span>
        </div>
      </div>
    </div>
  );
};

export default DetailMovies;
