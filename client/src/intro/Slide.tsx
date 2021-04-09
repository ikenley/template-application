import React from "react";
import classNames from "classnames";

// A "slide" within a scrolly. Purely CSS

type Props = {
  children: any;
  isFullScreen?: boolean;
};

const Slide = ({ children, isFullScreen }: Props) => {
  return (
    <div
      className={classNames("slide d-flex flex-column d-flex", {
        fullscreen: isFullScreen,
      })}
    >
      {children}
    </div>
  );
};

export default Slide;
