import React from "react";
import { Featured } from "../../components";
import MovieContainer from "../../components/MovieContainer";
import SeriesContainer from "../../components/SeriesContainer";
import "./Home.scss";

const Home = () => {
  return (
    <div id="home" className="home">
      <Featured />
      <MovieContainer />
      <SeriesContainer />
    </div>
  );
};

export default Home;
