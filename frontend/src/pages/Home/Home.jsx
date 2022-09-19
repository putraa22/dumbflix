import React from "react";
import { Featured, ListMovie, ListSeries } from "../../components";
import "./Home.scss";

const Home = () => {
  return (
    <div id="home" className="home">
      <Featured />
      <ListSeries />
      <ListMovie />
    </div>
  );
};

export default Home;
