import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Navbar from "../shared/Navbar";
import { ComparisonResult } from "../types";
import { SessionContext } from "../session/SessionContext";
import FilterPanel from "../session/FilterPanel";
import CompareChart from "./CompareChart";
import CompareGrid from "./CompareGrid";

const ComparePage = () => {
  const sessionContext = useContext(SessionContext);
  const { isLoading, sessionId } = sessionContext.session;
  const [result, setResult] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    axios.get(`/api/compare/${sessionId}`).then((res) => {
      setResult(res.data);
    });
  }, [isLoading, sessionId]);

  return (
    <div className="compare-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <div className="h1 text-center bg-primary text-white py-3 mb-2">
          Compare Institutions
        </div>
        <FilterPanel allowMultiInstitutions />
        <Alert variant="dark">
          Integer auctor iaculis elit, id egestas dolor accumsan ac. Donec nisi
          quam, scelerisque sed auctor sit amet, viverra id lacus. Cras bibendum
          lectus et enim pellentesque, id lacinia nisl malesuada. Integer
          euismod dolor felis, in mollis nisl viverra quis. Maecenas libero
          magna, tristique non varius sed, pretium sit amet erat. Cras
          sollicitudin convallis pulvinar. Fusce hendrerit hendrerit nibh in
          fermentum.
        </Alert>
        <CompareChart result={result} />
        <CompareGrid result={result} />
      </main>
    </div>
  );
};

export default ComparePage;
