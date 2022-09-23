import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function SeriesList({ id, seriesImg, title, year }) {
  return (
    <Link to={`/detail-movies/${id}`} className="text-decoration-none">
      <Card style={{ backgroundColor: "#1f1f1f" }} className="rounded border-0 mt-5 text-white">
        <Card.Img variant="top" src={seriesImg} />
        <Card.Body>
          <Card.Title style={{ fontSize: "18px" }}>{title}</Card.Title>
          <p className="text-muted">{year}</p>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default SeriesList;
