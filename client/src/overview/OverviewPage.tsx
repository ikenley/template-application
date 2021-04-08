import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { SessionContext } from "../session/SessionContext";
import FilterPanel from "./filters/FilterPanel";
import { OverviewResult } from "../types";
import OverviewChart from "./OverviewChart";
import SummaryStatPanel from "./SummaryStatPanel";
import ResultGrid from "./ResultGrid";

const ResultPanel = () => {
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
    <div className="overview-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <Alert variant="dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum
          porttitor risus. Aenean id nibh et libero aliquam maximus sit amet
          elementum ipsum. Proin vestibulum leo sit amet porta placerat. In hac
          habitasse platea dictumst. Aenean mollis leo eu purus pulvinar, a
          interdum urna iaculis. Proin ac orci lacus.
        </Alert>
        <FilterPanel />
        <OverviewChart result={result} />
        <SummaryStatPanel result={result} />
        <ResultGrid result={result} />
      </main>
    </div>
  );
};

export default ResultPanel;
