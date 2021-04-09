import React from "react";
import Navbar from "../shared/Navbar";
import "./scrolly.css";
import BirthCliff from "./slides/BirthCliff";

const IntroPage = () => {
  return (
    <div className="intro-page">
      <Navbar />
      <main role="main">
        {[1, 2, 3, 4].map((_, slideIndex) => (
          <BirthCliff key={slideIndex} />
        ))}
      </main>
    </div>
  );
};

export default IntroPage;
