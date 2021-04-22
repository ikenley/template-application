import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { SessionContext } from "../../session/SessionContext";
import { StepId } from "./YourInstitutionBaseSlide";
import { OverviewResult } from "../../types";
import OverviewChart from "../../overview/OverviewChart";
import useSessionOptionSet from "../../session/useSessionOptionSet";
import InstitutionSelector from "../../session/InstitutionSelector";

type Props = {
  currentStep: StepId;
};

const EnrollmentResultPanel = ({ currentStep }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const sessionOptionSet = useSessionOptionSet();
  const [result, setResult] = useState<OverviewResult | null>(null);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const { isLoading, sessionId } = session;

    if (!inView || isLoading) {
      return;
    }

    setResult(null);

    axios.get(`/api/Overview/${sessionId}`).then((res) => {
      setResult(res.data);
    });
  }, [inView, session]);

  return (
    <div ref={ref} className="enrollment-result-panel">
      <Card className="bg-white mb-3">
        <InstitutionSelector optionSet={sessionOptionSet} isMultiple={false} />
      </Card>
      <Card>
        <Card.Body className="bg-white">
          <OverviewChart
            result={result}
            hideBaseline={currentStep === StepId.Observed}
            hidePredicted
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default EnrollmentResultPanel;
