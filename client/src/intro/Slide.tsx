import React from "react";
import classNames from "classnames";

// A "slide" within a scrolly. Purely CSS

type Props = {
  children: any;
  isFullScreen?: boolean;
  className?: string;
  bgImg?: string;
};

const Slide = ({ children, isFullScreen, bgImg, className }: Props) => {
  return (
    <div
      className={classNames(
        "slide d-flex flex-column d-flex",
        {
          fullscreen: isFullScreen,
          "bg-img": bgImg,
          "container-fluid": !bgImg,
        },
        className
      )}
      style={{
        backgroundImage: bgImg ? `url('${bgImg}')` : "",
      }}
    >
      {children}
    </div>
  );
};

export default Slide;
