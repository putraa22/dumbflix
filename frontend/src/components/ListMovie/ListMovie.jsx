import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import ItemMovie from "../ListItem/ItemMovie/ItemMovie";
import data from "../../contstans/data";
import "./ListMovie.scss";

export default function List() {
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
    <div className="list">
      <span className="listTitle">Movie</span>
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
  );
}
