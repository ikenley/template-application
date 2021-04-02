import React from "react";
import { Jumbotron } from "react-bootstrap";
import Navbar from "../shared/Navbar";

const MarketPage = () => {
  return (
    <div className="market-page">
      <Navbar />
      <main
        role="main"
        className="container-xl container-xxl min-height-100-vh pt-3 pb-5"
      >
        <Jumbotron className="text-center">
          <h1>COVID-19 / Market Attractiveness</h1>
          <p>Coming soon</p>
        </Jumbotron>
      </main>
    </div>
  );
};

export default MarketPage;
