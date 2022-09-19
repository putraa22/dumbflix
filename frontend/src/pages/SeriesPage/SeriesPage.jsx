import React, { useState, useRef } from "react";
import "./SeriesPage.scss";
import { images, data } from "../../contstans";
import { PlayArrow, ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { ListSeries } from "../../components";
import ItemSeries from "../../components/ListItem/ItemSeries/ItemSeries";

const SeriesPage = () => {
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
      <div>
        <ListSeries />
        <div className="list">
          <div className="wrapper">
            <ArrowBackIosOutlined className="sliderArrow left" onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} />
            <div className="container" ref={listRef}>
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={0} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={1} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={2} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={3} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={4} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
              {data.ListSeries.map((series, idx) => (
                <ItemSeries index={5} key={series.title + idx} tvSeriesImg={series.tvSeriesImg} title={series.title} year={series.year} />
              ))}
            </div>
            <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick("right")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesPage;
