import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./shared/Footer";
import { AuthContextProvider } from "./auth/AuthContext";
import { SessionContextProvider } from "./session/SessionContext";
import ScrollToTop from "./shared/ScrollToTop";
import IntroPage from "./intro/IntroPage";
import OverviewPage from "./overview/OverviewPage";
import ComparePage from "./compare/ComparePage";
import MarketPage from "./market_info/MarketInfoPage";

function App() {
  return (
    <AuthContextProvider>
      <SessionContextProvider>
        <Router>
          <div className="app">
            <ScrollToTop />
            <Switch>
              <Route path="/intro">
                <IntroPage />
              </Route>
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
      </SessionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
