import React from "react";
import "./SeriesPage.scss";
import { images } from "../../contstans";
import { PlayArrow } from "@mui/icons-material";
import SeriesContainer from "../../components/SeriesContainer";

const SeriesPage = () => {
  return (
    <>
      <div className="app__series-page">
        <img src={images.banner2} alt="banner-series" />
        <div className="app__series-page_info">
          <img src={images.money} alt="joker-name" />
          <p className="app__series-page_desc p-text">
            Money Heist is a crime drama on Netflix - originally called La Casa de Papel. Money Heist season 3 has just been released by the streaming service. The plot reads: "Eight thieves take hostages and lock themselves in the Royal
            Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."
          </p>
          <div className="app__series-page-category">
            <span className="year_series-text p-text">2019</span>
            <span className="year_series-text-category p-text ">TV Series</span>
          </div>
          <div className="app__series-page-button">
            <button className="app__series-play">
              <PlayArrow />
              <span>WATCH NOW !</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        <SeriesContainer />
      </div>
    </>
  );
};

export default SeriesPage;
