import React from "react";
import { Row, Col } from "react-bootstrap";
import NumberFormatSpan from "../shared/NumberFormatSpan";
import { OverviewResult } from "../types";
import { SecondaryColor, TertiaryColor } from "../constants";

type Props = {
  result: OverviewResult;
  propName: "averageAnnualGrowth" | "projectedChange";
};

const SummaryStatScenarioComp = ({ result, propName }: Props) => {
  const { predicted, baseline, hasPredicted } = result;

  return (
    <div className="summary-stat-scenario-comp">
      <Row noGutters>
        <Col>
          <div className="h6">Baseline Scenario</div>
        </Col>
        <Col>
          <div className="h6">Alternate Scenario</div>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <NumberFormatSpan
            value={baseline[propName]}
            format="0.00%"
            className="h3"
          />
        </Col>
        <Col>
          <NumberFormatSpan
            value={predicted[propName]}
            format="0.00%"
            className="h3"
          />
        </Col>
      </Row>
    </div>
  );
};

export default SummaryStatScenarioComp;
