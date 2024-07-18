import React from "react";
import PlaceHolder from "./PlaceHolder";
import "../css/GameBoard.css";

const GameBoard = ({ guesses, currentGuess, letterStatus, gameResult }) => {
  return (
    <div className="game-board">
      {guesses.map((guess, index) => (
        <div key={index} className="word">
          {guess.split("").map((letter, idx) => (
            <span
              key={idx}
              className={`letter ${
                letterStatus[index] && letterStatus[index][idx]
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
      <div className="word">
        {currentGuess.split("").map((letter, idx) => (
          <span
            key={idx}
            className={`letter ${
              letterStatus[guesses.length] && letterStatus[guesses.length][idx]
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="placeholders">
        {Array.from({ length: 9 }, (_, index) => (
          <PlaceHolder key={index} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
