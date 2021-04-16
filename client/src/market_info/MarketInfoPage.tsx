import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Navbar from "../shared/Navbar";
import { MarketInfoResult } from "../types";
import { SessionContext } from "../session/SessionContext";
import MarketInfoChart from "./MarketInfoChart";
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
    });
  }, [isLoading, institutionId]);

  return (
    <div className="market-info-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <div className="h1 text-center bg-primary text-white py-3 mb-2">
          Market Analysis
        </div>
        <Alert variant="dark">
          <p>
            Quisque scelerisque aliquam consectetur. Cras eget elit quis eros
            luctus pulvinar. Curabitur dictum vel lacus ut tempor. Maecenas
            posuere, nunc at ullamcorper pellentesque, dolor sem lobortis metus,
            pretium vestibulum libero lorem in dui. In hac habitasse platea
            dictumst. Duis scelerisque sit amet diam vitae viverra.
          </p>
          <p className="mb-0">
            Nulla ut nunc lobortis ante tincidunt vestibulum at non odio. In
            eget enim purus. Donec sollicitudin enim non erat finibus, eget
            aliquam elit congue. Ut interdum convallis pretium. Pellentesque non
            ante in sem euismod viverra. In iaculis tincidunt tellus, non semper
            orci bibendum eu.
          </p>
        </Alert>
        <MarketInfoChart result={result} />
        <MarketInfoGrid result={result} />
      </main>
    </div>
  );
};

export default MarketInfoPage;
