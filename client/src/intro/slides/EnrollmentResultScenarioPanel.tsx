import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { SessionContext } from "../../session/SessionContext";
import { OverviewResult } from "../../types";
import MarketShareModel from "../../session/MarketShareModel";
import OverviewChart from "../../overview/OverviewChart";
import useSessionOptionSet from "../../session/useSessionOptionSet";
import InstitutionSelector from "../../session/InstitutionSelector";

type Props = {
  scenario: MarketShareModel;
};

type ScenarioResultMap = {
  [key in MarketShareModel]?: OverviewResult;
};

const EnrollmentResultScenarioPanel = ({ scenario }: Props) => {
  const sessionOptionSet = useSessionOptionSet();
  const [result, setResult] = useState<ScenarioResultMap>({});
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const { isLoading, sessionId } = session;

    if (isLoading) {
      setResult({});
      return;
    }

    // If result already exists for scenario, skip
    if (result[scenario]) {
      return;
    }

    axios
      .get(`/api/Overview/${sessionId}?marketShare=${scenario}`)
      .then((res) => {
        setResult((r) => {
          return { ...r, [scenario]: res.data };
        });
      });
  }, [session, scenario, result, setResult]);

  return (
    <div className="enrollment-result-panel">
      <Card className="mb-3">
        <InstitutionSelector optionSet={sessionOptionSet} isMultiple={false} />
      </Card>
      <Card>
        <Card.Body>
          <OverviewChart result={result[scenario]} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default EnrollmentResultScenarioPanel;
