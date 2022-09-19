import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
// import {Link } from 'react-router-dom';
// import NavbarAdmin from '../components/NavbarAdmin';
import { images } from "../../contstans";
import AddEpisode from "../../components/modal/AddEpisode";

function DetailFilm() {
  //modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  return (
    <div style={{}}>
      {/* <NavbarAdmin/> */}
      <Container>
        <Card border="dark">
          <Card.Img variant="top" src={images.detailfilm1} style={{ width: "100%", height: "80vh", objectFit: "cover" }} />
        </Card>
        <br></br>
        <Button variant="danger" style={{ float: "right" }} onClick={handleShowAdd}>
          Add Episode
        </Button>
        <br />
        <br />
        <br />
      </Container>

      <Container fluid style={{ marginLeft: "4rem" }}>
        <Row style={{ color: "white" }}>
          <Col xs={6} md={2}>
            <img src={images.detailfilm1} style={{ width: "200px", height: "300px", objectFit: "cover" }} alt="brand" />
          </Col>
          <Col xs={6} md={4}>
            <h3>Money Heist</h3>
            <Row xs="auto">
              <Col>
                <Card.Subtitle className="mb-2 text-muted">2019</Card.Subtitle>
              </Col>
              <Col style={{ border: "1px solid white" }}>
                <Card.Subtitle className="mb-2 text-muted">TV Series</Card.Subtitle>
              </Col>
            </Row>
            <br />
            <p style={{ textAlign: "justify" }}>
              Money Heist is a crime drama on Netflix - originally called La Casa de Papel. Money Heist season 3 has just been released by the streaming service. The plot reads: "Eight thieves take hostages and lock themselves in the Royal
              Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."
            </p>
          </Col>
          <Col xs={6} md={5}>
            <img src={images.detailfilm1} style={{ width: "494px", height: "272px", objectFit: "cover" }} alt="brand" />
            <Card.Body>
              <Card.Text>Money Heist : Episode 1</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
      <AddEpisode showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
    </div>
  );
}
export default DetailFilm;
