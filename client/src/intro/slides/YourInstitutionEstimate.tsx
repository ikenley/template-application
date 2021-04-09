import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Slide from "../Slide";
import Step from "../Step";
import PlaceholderChart from "../PlaceholderChart";

const YourInstitutionEstimate = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (inView) {
      console.log(`inView PlaceholderSlide YourInstitutionEstimate`);
    }
  }, [inView]);

  const handleStepChange = useCallback(
    (stepIx) => {
      setCurrentStep(stepIx);
      console.log(stepIx);
    },
    [setCurrentStep]
  );

  return (
    <div ref={ref}>
      <Slide>
        <div className="slide-title">What this Means for Your Institution</div>
        <Row className="slide-body justify-content-center">
          <Col>
            {[0, 1, 2].map((ix) => (
              <Step key={ix} onEnter={handleStepChange} data={ix}>
                <div style={{ height: "100vh" }}>
                  <Card>
                    <Card.Body>{ix}</Card.Body>
                  </Card>
                </div>
              </Step>
            ))}
          </Col>
          <Col>
            <div className="sticky-top mr-5" style={{ top: "50px" }}>
              <Card>
                <Card.Body>currentStep: {currentStep}</Card.Body>
              </Card>
              <PlaceholderChart title="foo" />
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default YourInstitutionEstimate;
