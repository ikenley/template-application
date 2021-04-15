import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import Navbar from "../shared/Navbar";
import { MarketInfoResult } from "../types";
import { SessionContext } from "../session/SessionContext";
import MarketInfoGrid from "./MarketInfoGrid";

const MarketInfoPage = () => {
  const sessionContext = useContext(SessionContext);
  const { isLoading, institutionId } = sessionContext.session;
  const [result, setResult] = useState<MarketInfoResult | null>(null);

  useEffect(() => {
    if (isLoading || !institutionId) {
      return;
    }

    axios.get(`/api/marketinfo/${institutionId}`).then((res) => {
      setResult(res.data);
      console.log("api/marketinfo", res.data);
    });
  }, [isLoading, institutionId]);

  return (
    <div className="market-info-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <Jumbotron className="text-center">
          <h1>COVID-19 / Market Attractiveness</h1>
          <p>Coming soon</p>
        </Jumbotron>
        <MarketInfoGrid result={result} />
      </main>
    </div>
  );
};

export default MarketInfoPage;
