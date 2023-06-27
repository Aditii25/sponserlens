import React, { useState } from "react";
import "../styles/popup.css";
import { CreateFlow } from "./CreateFlow";

function SendStreamPopup({ isOpen, setIsOpen, address }) {
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    handleClosePopup();
  };

  return (
    <div className="popup-container">
      <button onClick={handleOpenPopup}>Open Popup</button>
      {isOpen && (
        <div className="popup" onClick={handleOutsideClick}>
          <div className="popup-content" onClick={handlePopupClick}>
            <CreateFlow address={address} />
            {/* <button onClick={handleClosePopup}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SendStreamPopup;
