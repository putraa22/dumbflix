import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function MovieList({ id, movieImg, title, year }) {
  return (
    <Link to={`/video/${id}`} className="text-decoration-none">
      <Card style={{ backgroundColor: "#1f1f1f" }} className="rounded border-0 mt-5 text-white">
        <Card.Img variant="top" src={movieImg} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <p className="text-muted">{year}</p>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default MovieList;
