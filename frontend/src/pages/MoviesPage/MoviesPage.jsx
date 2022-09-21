import React from "react";
import "./MoviesPage.scss";
import { images } from "../../contstans";
import { PlayArrow } from "@mui/icons-material";
import MovieContainer from "../../components/MovieContainer";

const MoviesPage = () => {
  return (
    <>
      <div className="app__movies-page">
        <img src={images.banner3} alt="banner-movies" />
        <div className="app__movies-page_info">
          <img src={images.joker} alt="joker-name" />
          <p className="app__movies-page_desc p-text">
            In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the
            Joker.
          </p>
          <div className="app__movies-page-category">
            <span className="year_movies-text p-text">2019</span>
            <span className="year_movies-text-category p-text ">TV Series</span>
          </div>
          <div className="app__movies-page-button">
            <button className="app__movies-play">
              <PlayArrow />
              <span>WATCH NOW !</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        <MovieContainer />
      </div>
    </>
  );
};

export default MoviesPage;
