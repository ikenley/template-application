import React from "react";
import { useInView } from "react-intersection-observer";
import Slide from "../Slide";

const CoverSlide = () => {
  const { ref } = useInView({
    threshold: 0.5,
  });

  return (
    <div ref={ref}>
      <Slide isFullScreen>
        <div className="">
          <div className="slide-title mb-3 mt-0">
            Enrollment Scenario Explorer
          </div>
          <div className="text-center">
            <div className="lead text-white mb-5">
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
