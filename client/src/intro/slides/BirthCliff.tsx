import React, { useMemo } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { Line } from "react-chartjs-2";
import { createScales } from "../../shared/chart/chartExtensions";
import { PrimaryBlue } from "../../shared/Colors";
import Slide from "../Slide";
import CardHeader from "../CardHeader";

const BirthCliff = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      legend: { display: false },
      scales: createScales({
        x: { label: "Year" },
        y: { numeralFormat: "0,0", label: "Births" },
      }),
    };
  }, []);

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">
          The Great Recession Created a Birth Cliff
        </div>
        <Row className="slide-body justify-content-center">
          <Col lg={6}>
            <div className="mx-md-5">
              <Card bg="primary" text="white">
                <CardHeader>
                  Births Declined Dramatically after Great Recession, Never
                  Recovered
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

export default BirthCliff;

const chartDataProps = {
  labels: [
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
  ],
  datasets: [
    {
      label: "Births",
      fill: false,
      backgroundColor: PrimaryBlue,
      borderColor: PrimaryBlue,
      numeralFormat: "0,0",
      data: [
        3899589,
        3891494,
        3880894,
        3941553,
        3959417,
        4058814,
        4025933,
        4021726,
        4089950,
        4112052,
        4138349,
        4265555,
        4316233,
        4247694,
        4130665,
        3999386,
        3953590,
        3952841,
        3932181,
        3988076,
        3978497,
        3945875,
        3855500,
        3791712,
        3747540,
      ],
    },
  ],
};
