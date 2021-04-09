import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Slide from "../Slide";

const BirthCliff = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      console.log(`inView BirthCliff`);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Slide>
        <Row className="justify-content-center align-items-center h-100">
          <Col lg={5} className="d-flex">
            <div className="jumbotron mb-0">
              inView = {`${inView}`}
              <div className="h2">
                The Great Recession Created a Birth Cliff
              </div>
              <p className="lead">
                The Birth Dearth: A Steadily approaching demographic cliff
              </p>
              <hr className="my-4" />
              <p>
                In 2008, when the Great Recession hit, birth rates in the US
                collapsed. Even more than a decade later, fertility rates have
                not recovered. This decline in births starting in 2008 means
                that as we approach 2025, the effects of falling birth-rates
                will begin to affect college-aged populations.
              </p>
              <div className="d-flex align-items-center">
                <div className="mr-3">Fewer Babies Born Today </div>
                <i className="fas fa-arrow-right fa-lg"></i>
                <div className="ml-3">
                  Fewer College-aged students 18 Years Later
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div>TODO charts</div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default BirthCliff;
