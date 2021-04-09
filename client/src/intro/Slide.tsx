import React from "react";

// A "slide" within a scrolly. Purely CSS

type Props = {
  children: any;
};

const Slide = ({ children }: Props) => {
  return (
    <div
      className="slide"
      style={{
        height: "100vh",
        border: "1px solid gray",
      }}
    >
      {children}
    </div>
  );
};

export default Slide;
