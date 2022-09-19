import React, { useState, useRef } from "react";
import "./MoviesPage.scss";
import { images, data } from "../../contstans";
import { PlayArrow, ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { ListMovie } from "../../components";
import ItemMovie from "../../components/ListItem/ItemMovie/ItemMovie";

const MoviesPage = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 80;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${180 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-180 + distance}px)`;
    }
  };
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
      <div>
        <ListMovie />
        <div className="list">
          <div className="wrapper">
            <ArrowBackIosOutlined className="sliderArrow left" onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} />
            <div className="container" ref={listRef}>
              {data.ListFilm.map((film, idx) => (
                <ItemMovie index={0} key={film.title + idx} MovieImg={film.MovieImg} title={film.title} year={film.year} />
              ))}
              {data.ListFilm.map((film, idx) => (
                <ItemMovie index={1} key={film.title + idx} MovieImg={film.MovieImg} title={film.title} year={film.year} />
              ))}
              {data.ListFilm.map((film, idx) => (
                <ItemMovie index={2} key={film.title + idx} MovieImg={film.MovieImg} title={film.title} year={film.year} />
              ))}
              {data.ListFilm.map((film, idx) => (
                <ItemMovie index={3} key={film.title + idx} MovieImg={film.MovieImg} title={film.title} year={film.year} />
              ))}
            </div>
            <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesPage;
