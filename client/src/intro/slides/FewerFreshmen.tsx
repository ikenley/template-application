import React, { useMemo } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { Line } from "react-chartjs-2";
import { createScales } from "../../shared/chart/chartExtensions";
import { PrimaryBlue } from "../../shared/Colors";
import Slide from "../Slide";
import CardHeader from "../CardHeader";

const FewerFreshmen = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      legend: { display: false },
      scales: createScales({
        x: { label: "Year" },
        y: { label: "Students", numeralFormat: "0,0" },
      }),
    };
  }, []);

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">
          Fewer 18-Year Olds Leads to Fewer Freshmen
        </div>
        <Row className="slide-body justify-content-center">
          <Col lg={6}>
            <div className="mx-md-5">
              <Card>
                <CardHeader>
                  Nationally, College Demand Projected to Decline 11% From 2025
                  to 2030
                </CardHeader>
                <Card.Body className="bg-white">
                  <Line
                    redraw={inView}
                    options={options}
                    height={300}
                    data={chartDataProps}
                  />
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mx-md-5">
              <Card>
                <CardHeader>An Uneven Decline Across States </CardHeader>
                <Card.Body className="d-flex justify-content-center">
                  <Card.Img
                    className="img-fluid"
                    src="/img/regional_demographics.png"
                    alt="Projected Change in 4-Year Regional HEI-Going Students State
                  by State, 2025-2035"
                    style={{ maxWidth: "450px" }}
                  />
                </Card.Body>
                <Card.Body className="text-center">
                  Projected Change in 4-Year Regional HEI-Going Students State
                  by State, 2025-2035
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default FewerFreshmen;

const chartDataProps = {
  labels: [
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
  ],
  datasets: [
    {
      label: "College-Going Students",
      fill: false,
      backgroundColor: PrimaryBlue,
      borderColor: PrimaryBlue,
      numeralFormat: "0,0",
      data: [
        3151435,
        3197781,
        3091446,
        3168371,
        3161791,
        3197413,
        3180466,
        3294674,
        3211028,
        3101291,
        3031795,
        2968743,
        2927282,
        3084940,
        3116338,
        3021684,
        2999693,
        2933420,
      ],
    },
  ],
};
