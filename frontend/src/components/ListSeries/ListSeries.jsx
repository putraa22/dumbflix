import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import ItemSeries from "../ListItem/ItemSeries/ItemSeries";
import data from "../../contstans/data";
import "./ListSeries.scss";

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
      <span className="listTitle">TV Series</span>
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
  );
}
