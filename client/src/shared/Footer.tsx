import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-primary">
      <div className="container-xl container-xxl bg-primary pl-md-0">
        <span className="text-white">
          © {new Date().getFullYear()} TODO. All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
