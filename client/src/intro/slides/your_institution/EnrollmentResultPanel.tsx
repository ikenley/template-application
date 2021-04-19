import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { SessionContext } from "../../../session/SessionContext";
import { StepId } from "./YourInstitutionSlide";
import { OverviewResult } from "../../../types";
import OverviewChart from "../../../overview/OverviewChart";
import useSessionOptionSet from "../../../session/useSessionOptionSet";
import InstitutionSelector from "../../../session/InstitutionSelector";

type Props = {
  currentStep: StepId;
};

const EnrollmentResultPanel = ({ currentStep }: Props) => {
  const sessionOptionSet = useSessionOptionSet();
  const [result, setResult] = useState<OverviewResult | null>(null);
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    if (sessionContext.session.isLoading) {
      setResult(null);
      return;
    }

    const sessionId = sessionContext.session.sessionId;
    axios.get(`/api/Overview/${sessionId}`).then((res) => {
      setResult(res.data);
    });
  }, [sessionContext]);

  return (
    <div className="enrollment-result-panel">
      <Card className="mb-3">
        <InstitutionSelector optionSet={sessionOptionSet} isMultiple={false} />
      </Card>
      <Card>
        <Card.Body>
          <OverviewChart
            result={result}
            hidePredicted={currentStep === StepId.Observed}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default EnrollmentResultPanel;
