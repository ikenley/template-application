import React, { useEffect, useState, useContext, useRef } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import SessionContext from "../../session/SessionContext";
import { OverviewResult, emptyOverviewResult } from "../../types";
import MarketShareModel from "../../session/MarketShareModel";
import OverviewChart from "../../overview/OverviewChart";
import InstitutionSelector from "../../session/InstitutionSelector";

type Props = {
  scenario: MarketShareModel;
};

type ScenarioResultMap = {
  [key in MarketShareModel]?: OverviewResult;
};

const EnrollmentResultScenarioPanel = ({ scenario }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const resultCache = useRef<ScenarioResultMap>({});
  const [result, setResult] = useState<OverviewResult | null>(null);
  const { session, optionSet } = useContext(SessionContext);

  useEffect(() => {
    const { isLoading, sessionId } = session;

    if (!inView || isLoading) {
      resultCache.current = {};
      return;
    }

    // If result already exists for scenario, skip
    if (resultCache.current[scenario]) {
      const nextResult = resultCache.current[scenario];
      setResult(nextResult || emptyOverviewResult);
      return;
    }

    axios
      .get(`/api/Overview/${sessionId}?marketShare=${scenario}`)
      .then((res) => {
        resultCache.current[scenario] = res.data;
        setResult(res.data);
      });
  }, [inView, session, scenario, result, setResult]);

  return (
    <div ref={ref} className="enrollment-result-panel">
      <Card className="bg-white mb-3">
        <InstitutionSelector optionSet={optionSet} isMultiple={false} />
      </Card>
      <Card className="bg-white">
        <Card.Body>
          <OverviewChart result={result} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default EnrollmentResultScenarioPanel;
