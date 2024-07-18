import React from "react";
import "../css/About.css";

const ColorInfo = ({ onClose }) => {
  return (
    <div className="color-info">
      <div className="color-info-content">
        <h2>Color Meanings</h2>
        <div className="color-meaning">
          <div className="color-sample correct"></div>
          <span>Correct Letter on Correct Position</span>
        </div>
        <div className="color-meaning">
          <div className="color-sample incorrect-position"></div>
          <span>Correct letter on Incorrect position</span>
        </div>
        <div className="color-meaning">
          <div className="color-sample incorrect"></div>
          <span>Incorrect letter</span>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ColorInfo;
