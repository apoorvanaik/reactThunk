import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../styles/styles.css";

const DisplayContent = props => {
  const { avatar, id, first_name, last_name } = props.userDetails;
  return (
    <div className="imageWrapper">
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Image src={avatar} responsive />
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={6}>
          ID: {id}
        </Col>
        <Col xs={6} md={6}>
          Name: {first_name} {last_name}
        </Col>
      </Row>
    </div>
  );
};

export default DisplayContent;
