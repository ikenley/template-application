import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import FilterPanel from "./FilterPanel";
import { OverviewResult } from "./types";
import OverviewChart from "./OverviewChart";
import SummaryStatPanel from "./SummaryStatPanel";
import ResultGrid from "./ResultGrid";

const ResultPanel = () => {
  const [result, setResult] = useState<OverviewResult | null>(null);

  useEffect(() => {
    axios.get("/api/Overview").then((res) => {
      //setResult(res.data);
    });
  }, []);

  return (
    <div className="overview-page">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">LOGO | Enrollment Forecasts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Oveview</Nav.Link>
            <Nav.Link href="#link">Compare Institutions</Nav.Link>
            <Nav.Link href="#link">COVID-19</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
