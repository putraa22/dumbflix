import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { ListMovie } from "../../components";
import ItemMovie from "../../components/ListItem/ItemMovie/ItemMovie";
import "./ListFilmAdmin.scss";
import { data } from "../../contstans";

function ListFilm() {
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
    <div className="list__film-admin" style={{  }}>
      <Container fluid>
        <Row>
          <Col xs={12} md={8}>
            <h3 style={{ color: "white", marginTop: "10px" }}>List Film</h3>
          </Col>
          <Col style={{ marginLeft: "-750px", marginTop: "15px", color: "white" }}>
            <Row>
              <Col>
                <p>Category</p>
              </Col>
              <Col>
                <Dropdown style={{ marginLeft: "-310px" }}>
                  <Dropdown.Toggle style={{ border: "0px solid" }} variant="black" id="dropdown-basic"></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/list-film">Movies</Dropdown.Item>
                    <Dropdown.Item href="/tv-show">TV Show</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={4}>
            <Button variant="danger" style={{ marginLeft: "330px", marginTop: "10px" }}>
              <Link className="text-white text-decoration-none" to={'/add-film'} >
                Add Film
              </Link>
            </Button>
          </Col>
        </Row>
        <div className="list_film-admin_container">
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
        {/* <Row xs={1} md={6} className="g-4">
          <Col>
            <Card style={{ backgroundColor: "black" }}>
              <Card.Img variant="top" src={images.tvseries1} />
              <Card.Body>
                <Card.Title style={{ color: "white", marginLeft: "-16px", marginTop: "-5px" }}>
                  <Link className="text-white text-decoration-none" to={"/detail-film"}>
                    Sang Pemimpi
                  </Link>
                </Card.Title>
                <Card.Text style={{ color: "white", marginLeft: "-16px", marginTop: "-5px" }}>2019</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}
export default ListFilm;
