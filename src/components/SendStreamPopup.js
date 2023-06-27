import React, { useState } from "react";
import "../styles/popup.css";

function SendStreamPopup({ isOpen, setIsOpen }) {
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
            <h3>Popup Content</h3>
            <p>This is the content of the popup.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendStreamPopup;
