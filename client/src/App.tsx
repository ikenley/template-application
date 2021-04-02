import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./shared/Footer";
import OverviewPage from "./overview/OverviewPage";
import ComparePage from "./compare/ComparePage";
import MarketPage from "./market/MarketPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/compare">
            <ComparePage />
          </Route>
          <Route path="/market">
            <MarketPage />
          </Route>
          <Route path="/">
            <OverviewPage />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
