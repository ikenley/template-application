import React from "react";
import Navbar from "../shared/Navbar";
import "./scrolly.css";
import BirthCliff from "./slides/BirthCliff";
import YourInstitutionSlide from "./slides/your_institution/YourInstitutionSlide";
import AccessTool from "./slides/AccessTool";
import PlaceholderSlide from "./slides/PlaceholderSlide";

const IntroPage = () => {
  return (
    <div className="intro-page">
      <Navbar />
      <main role="main">
        <BirthCliff />
        <PlaceholderSlide title="Fewer 18-Year Olds Leads to Fewer Freshmen" />
        <YourInstitutionSlide />
        <PlaceholderSlide title="How Will Institutions Adjust to Decline? " />
        <PlaceholderSlide title="What this Means for Your Institution [Show market share scenarios]" />
        <PlaceholderSlide title={`The Enrollment Scenario "Recipe"`} />
        <AccessTool />
      </main>
    </div>
  );
};

export default IntroPage;
