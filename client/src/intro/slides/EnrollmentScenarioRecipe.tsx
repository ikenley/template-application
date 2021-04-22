import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import numeral from "numeral";
import Skeleton from "react-loading-skeleton";
import { SessionContext } from "../../session/SessionContext";
import Slide from "../Slide";
import CardHeader from "../CardHeader";
import { RegionDataPoint } from "../../types";
import RegionLabel from "./RegionLabel";
import PredictedMarketEnrollmentPanel from "./PredictedMarketEnrollmentPanel";

const EnrollmentScenarioRecipe = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { session } = useContext(SessionContext);
  const [region, setRegion] = useState<RegionDataPoint | null>(null);

  useEffect(() => {
    const { isLoading, institutionId } = session;
    if (!inView || isLoading) {
      return;
    }

    axios.get(`/api/region/top/${institutionId}`).then((res) => {
      setRegion(res.data);
    });
  }, [inView, session]);

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">The Enrollment Scenario ‘Recipe’</div>
        <Row className="slide-body justify-content-center mb-5">
          <Col lg={6}>
            <div className="mx-md-5">
              <Card>
                <CardHeader>
                  <div className="h2 mb-0">Ingredient 1:</div>
                </CardHeader>
                <Card.Body>
                  <h2>State-by-State Enrollment Projections</h2>
                </Card.Body>
              </Card>
            </div>
            <div className="mx-md-5 mt-5">
              <PredictedMarketEnrollmentPanel region={region} />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mx-md-5">
              <Card>
                <CardHeader>
                  <div className="h2 mb-0">Ingredient 2:</div>
                </CardHeader>
                <Card.Body>
                  <h2>Your Institution’s Share of Students in Each State</h2>
                </Card.Body>
              </Card>
            </div>
            <div className="mx-md-5 mt-5">
              <Card>
                <CardHeader>
                  Students from <RegionLabel region={region} />
                </CardHeader>
                <Card.Body className="bg-white text-body">
                  <Row className="align-items-center">
                    <Col sm={3}>
                      <span className="text-primary">
                        <i className="fas fa-chart-pie fa-10x"></i>
                      </span>
                    </Col>
                    <Col sm={9}>
                      <div className="h5 mb-0">
                        Students from <RegionLabel region={region} /> who attend
                        your institution:
                      </div>
                      <div className="h1 mb-0">
                        {region ? (
                          <span className="text-secondary font-weight-bold">
                            {numeral(region.marketShare).format("0.0000%")}
                          </span>
                        ) : (
                          <Skeleton width={150} />
                        )}{" "}
                        share
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default EnrollmentScenarioRecipe;
