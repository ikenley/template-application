import React from "react";
import Navbar from "../shared/Navbar";
import "./scrolly.css";
import CoverSlide from "./slides/CoverSlide";
import BirthCliff from "./slides/BirthCliff";
import FewerFreshmen from "./slides/FewerFreshmen";
import YourInstitutionBaseSlide from "./slides/YourInstitutionBaseSlide";
import YourInstitutionScenarioSlide from "./slides/YourInstitutionScenarioSlide";
import EnrollmentScenarioRecipe from "./slides/EnrollmentScenarioRecipe";
import AccessTool from "./slides/AccessTool";
import PlaceholderSlide from "./slides/PlaceholderSlide";

const IntroPage = () => {
  return (
    <div className="intro-page">
      <Navbar />
      <main role="main">
        <CoverSlide />
        <BirthCliff />
        <FewerFreshmen />
        <YourInstitutionBaseSlide />
        <PlaceholderSlide title="How Will Institutions Adjust to Decline? " />
        <YourInstitutionScenarioSlide />
        <EnrollmentScenarioRecipe />
        <AccessTool />
      </main>
    </div>
  );
};

export default IntroPage;
