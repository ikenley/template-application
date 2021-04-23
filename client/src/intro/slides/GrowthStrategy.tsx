import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Slide from "../Slide";
import CardHeader from "../CardHeader";

const GrowthStrategy = () => {
  return (
    <div>
      <Slide>
        <div className="slide-title">
          How Will Institutions Adjust to Decline?
          <br />
          <small>Go Big or Go (Farther from) Home</small>
        </div>
        <Row className="slide-body justify-content-center mb-5">
          <Col lg={6}>
            <div className="d-flex justify-content-center">
              <Card className="justify-content-center">
                <div className="bg-standard">
                  <span className="badge badge-pill badge-primary card-badge mb-3">
                    1
                  </span>
                </div>
                <CardHeader>
                  {" "}
                  Recruit in States with More Favorable Demographics
                </CardHeader>
                <div className="text-center bg-white">
                  <Card.Img
                    src="/img/change_region.png"
                    style={{ maxWidth: "800px" }}
                  />
                </div>
              </Card>
            </div>
          </Col>
          <Col lg={6}>
            <div className="d-flex justify-content-center">
              <Card className="justify-content-center">
                <div className="bg-standard">
                  <span className="badge badge-pill badge-primary card-badge mb-3">
                    2
                  </span>
                </div>
                <CardHeader>
                  Take a Larger Share of A Shrinking Pool of Students (Market
                  Share)
                </CardHeader>
                <div className="text-center bg-white">
                  <Card.Img
                    src="/img/change_market_share.png"
                    style={{ maxWidth: "800px" }}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default GrowthStrategy;
