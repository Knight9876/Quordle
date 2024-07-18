import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/KeyBoard.css";

const KeyBoard = ({ onGuess, onEnter, onBackspace, keyboardStatus }) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];
  let lime = false;

  const getClassName = (letter) => {
    if (keyboardStatus[letter]) {
      return keyboardStatus[letter].correct ? `key correct` : `key`;
    }
    return "key";
  };

  const getCornerColor = (letter, corner) => {
    if (!keyboardStatus[letter]) return "transparent";

    // Check if "correct" status is present
    if (keyboardStatus[letter][corner] === "correct") {
      return "lime";
    }

    // Handle other statuses if "correct" is not present
    switch (keyboardStatus[letter][corner]) {
      case "incorrect-position":
        return "yellow";
      case "incorrect":
        return "grey";
      default:
        return "transparent";
    }
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {firstRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            <span className="text">{letter}</span>
            <div
              className="corner top-left"
              style={{ backgroundColor: getCornerColor(letter, 0) }}
            >
              1
            </div>
            <div
              className="corner top-right"
              style={{ backgroundColor: getCornerColor(letter, 1) }}
            >
              2
            </div>
            <div
              className="corner bottom-right"
              style={{ backgroundColor: getCornerColor(letter, 2) }}
            >
              3
            </div>
            <div
              className="corner bottom-left"
              style={{ backgroundColor: getCornerColor(letter, 3) }}
            >
              4
            </div>
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {secondRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            <span className="text">{letter}</span>
            <div
              className="corner top-left"
              style={{ backgroundColor: getCornerColor(letter, 0) }}
            >
              1
            </div>
            <div
              className="corner top-right"
              style={{ backgroundColor: getCornerColor(letter, 1) }}
            >
              2
            </div>
            <div
              className="corner bottom-right"
              style={{ backgroundColor: getCornerColor(letter, 2) }}
            >
              3
            </div>
            <div
              className="corner bottom-left"
              style={{ backgroundColor: getCornerColor(letter, 3) }}
            >
              4
            </div>
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        <button className="key" onClick={onBackspace}>
          <FontAwesomeIcon icon={faBackspace} />
        </button>
        {thirdRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            <span className="text">{letter}</span>
            <div
              className="corner top-left"
              style={{ backgroundColor: getCornerColor(letter, 0) }}
            >
              1
            </div>
            <div
              className="corner top-right"
              style={{ backgroundColor: getCornerColor(letter, 1) }}
            >
              2
            </div>
            <div
              className="corner bottom-right"
              style={{ backgroundColor: getCornerColor(letter, 2) }}
            >
              3
            </div>
            <div
              className="corner bottom-left"
              style={{ backgroundColor: getCornerColor(letter, 3) }}
            >
              4
            </div>
          </button>
        ))}
        <button className="key" onClick={onEnter}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </button>
      </div>
    </div>
  );
};

export default KeyBoard;
