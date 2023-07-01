import React from "react";
import "../styles/navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar-outer">
      <div className="navbar">
        <Link to={"/"}>
          <div className="navbar-left">SponserLens</div>
        </Link>
        <div className="navbar-right">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
