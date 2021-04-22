import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { OverviewResult } from "../types";
import ResultGrid from "./ResultGrid";

type Props = {
  result: OverviewResult | null;
};

const ResultGridContainer = ({ result }: Props) => {
  return (
    <div className="result-grid-container mt-3">
      <Tabs
        defaultActiveKey="enrollment"
        id="result-grid-container"
        transition={false}
      >
        <Tab eventKey="enrollment" title="Summary">
          <ResultGrid
            result={result}
            propName="enrollment"
            numeralFormat="0,0"
            baseHeader="Baseline Enrollment Forecast"
            altHeader="Alternate Forecast Scenario"
          />
        </Tab>
        <Tab eventKey="share" title="Market Share Detail">
          <ResultGrid
            result={result}
            propName="marketShare"
            numeralFormat="0.0000%"
            baseHeader="Baseline Enrollment Share Forecast"
            altHeader="Alternate Share Forecast Scenario"
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ResultGridContainer;
