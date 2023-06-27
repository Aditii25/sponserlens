import React from "react";
import "../styles/navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <nav className="navbar-outer">
      <div className="navbar">
        <div className="navbar-left">LOGO</div>
        <div className="navbar-right">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
