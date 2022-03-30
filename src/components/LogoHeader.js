import React from "react";
import logo from "../assets/full.png";
import "./LogoHeader.css";

const LogoHeader = () => {
  return (
    <div id="logoDiv">
      <img
        id="imgLogo"
        src={logo}
        alt="Logo Le Voyageur. shows a compass followed by the text Le Voyageur"
      />
    </div>
 
  );
};

export default LogoHeader;
