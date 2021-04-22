import React from "react";
import Slide from "../Slide";

const CoverSlide = () => {
  return (
    <div>
      <Slide isFullScreen bgImg="/img/intro-cover.jpg" className="cover">
        <div className="container-fluid">
          <div className="slide-title mb-3 mt-0">
            Enrollment Scenario Explorer
          </div>
          <div className="text-center">
            <div className="lead text-white mb-5 backdrop-filter">
              Integer ut hendrerit nunc. Maecenas sollicitudin pharetra arcu
              quis vulputate. Sed ac ex mauris. Nullam ullamcorper commodo nunc
              sed dignissim. Praesent pellentesque, ante at posuere semper.
            </div>
            <div className="text-secondary">
              <i className="fas fa-chevron-down fa-3x" />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default CoverSlide;
