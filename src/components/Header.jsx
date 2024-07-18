import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import "../css/Header.css";

const Header = ({ showInfo }) => {
  return (
    <header className="header">
      <h1 className="title">Quordle</h1>
      <button className="info-button" onClick={showInfo}>
        <FontAwesomeIcon icon={faInfo} />
      </button>
    </header>
  );
};

export default Header;
