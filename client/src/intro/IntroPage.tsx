import React from "react";
import Navbar from "../shared/Navbar";
import "./scrolly.css";
import CoverSlide from "./slides/CoverSlide";
import BirthCliff from "./slides/BirthCliff";
import YourInstitutionSlide from "./slides/your_institution/YourInstitutionSlide";
import EnrollmentScenarioRecipe from "./slides/EnrollmentScenarioRecipe";
import AccessTool from "./slides/AccessTool";
import PlaceholderSlide from "./slides/PlaceholderSlide";

const IntroPage = () => {
  return (
    <div className="intro-page">
      <Navbar />
      <main role="main" className="container-fluid">
        <CoverSlide />
        <BirthCliff />
        <PlaceholderSlide title="Fewer 18-Year Olds Leads to Fewer Freshmen" />
        <YourInstitutionSlide />
        <PlaceholderSlide title="How Will Institutions Adjust to Decline? " />
        <PlaceholderSlide title="What this Means for Your Institution [Show market share scenarios]" />
        <EnrollmentScenarioRecipe />
        <AccessTool />
      </main>
    </div>
  );
};

export default IntroPage;
