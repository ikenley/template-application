import React from "react";

// A "slide" within a scrolly. Purely CSS

type Props = {
  children: any;
};

const Slide = ({ children }: Props) => {
  return <div className="slide d-flex flex-column d-flex">{children}</div>;
};

export default Slide;
