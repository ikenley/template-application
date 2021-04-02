import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import FilterPanel from "./FilterPanel";
import { OverviewResult } from "./types";
import OverviewChart from "./OverviewChart";
import SummaryStatPanel from "./SummaryStatPanel";
import ResultGrid from "./ResultGrid";

const ResultPanel = () => {
  const [result, setResult] = useState<OverviewResult | null>(null);

  useEffect(() => {
    axios.get("/api/Overview").then((res) => {
      setResult(res.data);
    });
  }, []);

  return (
    <div className="overview-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <FilterPanel />
        <OverviewChart result={result} />
        <SummaryStatPanel result={result} />
        <ResultGrid result={result} />
      </main>
    </div>
  );
};

export default ResultPanel;
