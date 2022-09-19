import React from "react";
import "./Featured.scss";
import { PlayArrow, InfoOutlined } from "@mui/icons-material";
import { images } from "../../contstans";

const Featured = ({ type }) => {
  return (
    <div className="app__featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option value="">Genre</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="romance">Romance</option>
            <option value="fight">Fight</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
          </select>
        </div>
      )}

      <img src={images.banner1} alt="Banner" />
      <div className="app__featured-info">
        <img src={images.thewitcher} alt="info" />
        <p className="app__desc p-text">Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beast</p>
        <div className="app__year-category">
          <span className="year_banner-text text-year">2019</span>
          <span className="year_banner-text category-text">TV Series</span>
        </div>
        <div className="app__buttons">
          <button className="app__play">
            <PlayArrow />
            <span>WATCH NOW !</span>
          </button>
          <button className="app__more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
