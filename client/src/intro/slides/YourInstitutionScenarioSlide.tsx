import React, { useState, useCallback, useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { LastObservedYear, ScenarioAllIncreaseAmount } from "../../constants";
import Slide from "../Slide";
import Step from "../Step";
import CardHeader from "../CardHeader";
import EnrollmentResultScenarioPanel from "./EnrollmentResultScenarioPanel";
import MarketShareModel from "../../session/MarketShareModel";
import { SessionContext } from "../../session/SessionContext";

const YourInstitutionScenarioSlide = () => {
  const { session } = useContext(SessionContext);
  const { institutionName } = session;

  const [currentStep, setCurrentStep] = useState<MarketShareModel>(
    MarketShareModel.AllIncrease
  );

  const handleStepChange = useCallback(
    (stepId: MarketShareModel) => {
      setCurrentStep(stepId);
    },
    [setCurrentStep]
  );

  return (
    <div className="your-institution-scenario-slide">
      <Slide>
        <div className="slide-title">What this Means for Your Institution</div>
        <Row className="slide-body justify-content-center">
          <Col>
            <Step
              onEnter={handleStepChange}
              data={MarketShareModel.AllIncrease}
            >
              <Card>
                <CardHeader>
                  If {institutionName}{" "}
                  <span className="text-secondary font-weight-bold">
                    Increases Share by {ScenarioAllIncreaseAmount}%
                  </span>
                </CardHeader>
                <Card.Body>
                  Institution’s market share increases by ~
                  {ScenarioAllIncreaseAmount}% in each state from{" "}
                  {LastObservedYear} levels
                </Card.Body>
              </Card>
              <Card className="mt-5">
                <CardHeader>Key Assumption</CardHeader>
                <Card.Body>
                  {institutionName} out-competes others and takes a larger share
                  of the market
                </Card.Body>
              </Card>
            </Step>
            <Step
              onEnter={handleStepChange}
              data={MarketShareModel.AllDecrease}
            >
              <Card>
                <CardHeader>
                  If {institutionName}{" "}
                  <span className="text-secondary font-weight-bold">
                    Decreases Market Share by {ScenarioAllIncreaseAmount}%
                  </span>
                </CardHeader>
                <Card.Body>
                  Institution’s market share decreases by ~
                  {ScenarioAllIncreaseAmount}% in each state from{" "}
                  {LastObservedYear} levels
                </Card.Body>
              </Card>
              <Card className="mt-5">
                <CardHeader>Key Assumption</CardHeader>
                <Card.Body>
                  Other institutions out-compete {institutionName}, and take
                  part of its market share
                </Card.Body>
              </Card>
            </Step>
          </Col>
          <Col>
            <div className="sticky-top mr-md-5" style={{ top: "50px" }}>
              <Card>
                <CardHeader>
                  First-Time Fall Enrollments at {institutionName}:
                  <div className="text-secondary font-weight-bold">
                    {currentStep === MarketShareModel.AllIncrease
                      ? "If Market Share Increases Across All States"
                      : currentStep === MarketShareModel.Trend
                      ? "If Market Share Changes in-line with Prior Trends"
                      : "If Market Share Decreases Significantly"}
                  </div>
                </CardHeader>
              </Card>
              <EnrollmentResultScenarioPanel scenario={currentStep} />
            </div>
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default YourInstitutionScenarioSlide;
