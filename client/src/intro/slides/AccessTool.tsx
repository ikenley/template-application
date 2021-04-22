import React from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Slide from "../Slide";

const AccessTool = () => {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  return (
    <div ref={ref}>
      <Slide isFullScreen>
        <div className="">
          <div className="slide-title mb-3 mt-0">
            View Estimates for{" "}
            <span className={classNames({ "text-secondary": inView })}>
              Your Institution
            </span>
          </div>
          <div className="text-center">
            <div className="lead text-white mb-5">
              Morbi a ullamcorper dolor. Proin et mi metus. Donec pretium, eros
              eget interdum elementum, nulla lectus ornare risus, id euismod
              libero odio vel libero. Aliquam dictum erat mattis tincidunt
              porta.
            </div>
            <Link className="btn btn-secondary btn-lg" to="/">
              Access the tool <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default AccessTool;
