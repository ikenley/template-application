import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import { Line } from "react-chartjs-2";
import { PrimaryColor, SecondaryColor } from "../../constants";
import Slide from "../Slide";
import fakeChartData from "./fakeChartData";

const BirthCliff = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [result, setResult] = useState<boolean>(true);

  useEffect(() => {
    if (inView) {
      console.log(`inView BirthCliff`);
    }
  }, [inView]);

  const chartDataProps = fakeChartData;

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-header">
          The Great Recession Created a Birth Cliff
        </div>
        <Row className="slide-body justify-content-center">
          <Col lg={6}>
            <div className="mx-5">
              <Card className="border-0">
                <Card.Body className="bg-primary text-white">
                  <Card.Title className="mb-0">
                    Births Declined Dramatically after Great Recession, Never
                    Recovered
                  </Card.Title>
                </Card.Body>
                <Card.Body>
                  {result ? (
                    <Line
                      redraw={inView}
                      options={{
                        maintainAspectRatio: false,
                        legend: { position: "bottom" },
                        title: {
                          display: true,
                          fontSize: 16,
                          text: "First-time Fall Enrollments",
                        },
                      }}
                      height={300}
                      data={chartDataProps}
                    />
                  ) : (
                    <Skeleton height={300} />
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mx-5">
              <Card className="border-0">
                <Card.Body className="bg-primary text-white">
                  <Card.Title className="mb-0">
                    Birth Cliff will impact colleges and universities after 2025
                  </Card.Title>
                </Card.Body>
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

export default BirthCliff;
