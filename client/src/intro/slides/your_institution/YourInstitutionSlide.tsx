import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Slide from "../../Slide";
import Step from "../../Step";
import CardHeader from "../../CardHeader";
import EnrollmentResultPanel from "./EnrollmentResultPanel";

export enum StepId {
  Observed = 0,
  Predicted = 1,
}

const YourInstitutionSlide = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [currentStep, setCurrentStep] = useState<StepId>(StepId.Observed);

  useEffect(() => {
    if (inView) {
      console.log(`inView PlaceholderSlide YourInstitutionSlide`);
    }
  }, [inView]);

  const handleStepChange = useCallback(
    (stepId: StepId) => {
      setCurrentStep(stepId);
    },
    [setCurrentStep]
  );

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">What this Means for Your Institution</div>
        <Row className="slide-body justify-content-center">
          <Col>
            <Step onEnter={handleStepChange} data={StepId.Observed}>
              <div className="mx-5 h-100-vh">
                <Card>
                  <CardHeader>Reported Enrollments:</CardHeader>
                  <Card.Body>
                    This line shows total first-time enrollments across all
                    states and regions for your institution between 2002 and
                    2018.
                  </Card.Body>
                </Card>
              </div>
            </Step>
            <Step onEnter={handleStepChange} data={StepId.Predicted}>
              <div className="mx-5 h-100-vh">
                <Card>
                  <CardHeader>
                    If Nothing Changes: Holding Competition {"&"} Market Share
                    at 2018 Rates:{" "}
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
              </div>
            </Step>
          </Col>
          <Col>
            <div className="sticky-top mr-5" style={{ top: "50px" }}>
              <EnrollmentResultPanel currentStep={currentStep} />
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default YourInstitutionSlide;
