import React from "react";
import "../styles/Header.css";

const Header = ({ onScrollTo }) => {
  return (
    <nav className="header-nav" aria-label="Section anchors">
      <a
        href="#year-grid"
        onClick={(e) => {
          e.preventDefault();
          onScrollTo("grid");
        }}
      >
        Grid
      </a>
      <a
        href="#year-pct"
        onClick={(e) => {
          e.preventDefault();
          onScrollTo("pct");
        }}
      >
        Percent
      </a>
      <a
        href="#day-track"
        onClick={(e) => {
          e.preventDefault();
          onScrollTo("track");
        }}
      >
        Track
      </a>
    </nav>
  );
};

export default Header;
