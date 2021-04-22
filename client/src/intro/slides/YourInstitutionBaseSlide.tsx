import React, { useState, useCallback } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Slide from "../Slide";
import Step from "../Step";
import CardHeader from "../CardHeader";
import EnrollmentResultPanel from "./EnrollmentResultBasePanel";

export enum StepId {
  Observed = 0,
  Predicted = 1,
}

const YourInstitutionSlide = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(StepId.Observed);

  const handleStepChange = useCallback(
    (stepId: StepId) => {
      setCurrentStep(stepId);
    },
    [setCurrentStep]
  );

  return (
    <div className="your-institution-base-slide">
      <Slide>
        <div className="slide-title">What this Means for Your Institution</div>
        <Row className="slide-body justify-content-center">
          <Col>
            <Step onEnter={handleStepChange} data={StepId.Observed}>
              <Card>
                <CardHeader>Reported Enrollments:</CardHeader>
                <Card.Body>
                  This line shows total first-time enrollments across all states
                  and regions for your institution between 2002 and 2018.
                </Card.Body>
              </Card>
            </Step>
            <Step onEnter={handleStepChange} data={StepId.Predicted}>
              <Card>
                <CardHeader>
                  If Nothing Changes: Holding Competition {"&"} Market Share at
                  2018 Rates:{" "}
                </CardHeader>
                <Card.Body>
                  Projections, freezing institution’s market share at 2018
                  levels.
                </Card.Body>
              </Card>
              <Card className="mt-5">
                <CardHeader>Key Assumption</CardHeader>
                <Card.Body>
                  Nothing else changes – your institution and other’s all hold
                  steady.
                </Card.Body>
              </Card>
            </Step>
          </Col>
          <Col>
            <div className="sticky-top mr-md-5" style={{ top: "50px" }}>
              <EnrollmentResultPanel currentStep={currentStep} />
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default YourInstitutionSlide;
