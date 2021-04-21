import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Slide from "../Slide";
import PlaceholderChart from "../PlaceholderChart";
import CardHeader from "../CardHeader";

const PlaceholderSlide = ({ title }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      console.log(`inView PlaceholderSlide ${title}`);
    }
  }, [inView, title]);

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">{title}</div>
        <Row className="slide-body justify-content-center">
          <Col lg={6}>
            <div className="mx-md-5">
              <PlaceholderChart
                redraw={inView}
                title="In orci neque, efficitur sed venenatis ac, consequat non orci."
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mx-md-5">
              <Card>
                <CardHeader>
                  Birth Cliff will impact colleges and universities after 2025
                </CardHeader>
                <Card.Body className="">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="mr-3 h5">Fewer Babies Born Today </div>
                    <i className="fas fa-arrow-right fa-lg"></i>
                    <div className="ml-3 h5">
                      Fewer College-aged students 18 Years Later
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default PlaceholderSlide;
