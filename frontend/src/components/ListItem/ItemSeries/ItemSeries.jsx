import "./ItemSeries.scss";

import { images } from "../../../contstans";
import { useState } from "react";
import { Link } from "react-router-dom";

// const cardImages = [images.series, images.series2, images.series3, images.series4, images.series5, images.series6, images.series7, images.series8, images.series9];

const ListItem = ({ tvSeriesImg, title, year, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const trailer2 = [images.video2];

  return (
    <div className="app__listItem" style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="app__listItem-card">
        <img src={tvSeriesImg} alt="Series" />
        {isHovered && (
          <>
            <Link to="/detail-series">
              <video src={trailer2} autoPlay={true} loop />
            </Link>

            <div className="itemInfo">
              <span>{title}</span>
              <span className="item__year">{year}</span>
            </div>
          </>
        )}
      </div>
      {/* {cardImages.map((tvseries, index) => (
        <div className="app__listItem-card" key={`app__image-${index + 1}`}>
          <img src={tvseries} alt="images-card" />
        </div>
      ))} */}
    </div>
  );
};

export default ListItem;
