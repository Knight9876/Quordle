import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import About from "./components/About";
import KeyBoard from "./components/KeyBoard";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([[], [], [], []]); // One array per gameboard
  const [targetWords, setTargetWords] = useState(["", "", "", ""]);
  const [letterStatus, setLetterStatus] = useState([[], [], [], []]);
  const [keyboardStatus, setKeyboardStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [gameBoardCompleted, setGameBoardCompleted] = useState([
    false,
    false,
    false,
    false,
  ]); // Tracks completion status of each game board
  const [totalGuesses, setTotalGuesses] = useState(1); // Tracks total guesses across all game boards
  const [gameResult, setGameResult] = useState(""); // State for game result

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  // Function to fetch random five-letter words for all gameboards
  const fetchRandomWords = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.datamuse.com/words?sp=?????&max=1000"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      const fiveLetterWords = data.filter(
        (word) => word.word.length === 5 && word.score > 2000
      );

      if (fiveLetterWords.length < 4) {
        throw new Error("Not enough suitable words found");
      }

      const uniqueWordsSet = new Set();
      while (uniqueWordsSet.size < 4) {
        const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
        uniqueWordsSet.add(fiveLetterWords[randomIndex].word.toUpperCase());
      }

      const randomWords = Array.from(uniqueWordsSet);
      setTargetWords(randomWords);
      console.log(randomWords);
    } catch (error) {
      console.error("Error fetching random words:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const handleGuess = (letter) => {
    if (gameResult || currentGuess.length >= 5) {
      return; // Do not accept input if game is over or guess is already 5 letters
    }
    setCurrentGuess(currentGuess + letter.toUpperCase());
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (gameResult) {
      return; // Do not process any key press if game is over
    }
    if (/^[a-zA-Z]$/.test(key)) {
      handleGuess(key);
    } else if (key === "Enter" && currentGuess.length === 5) {
      submitGuess();
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  const handleBackspace = () => {
    if (gameResult) {
      return; // Do not process backspace if game is over
    }
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const checkIfWordIsValid = async (word) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.datamuse.com/words?sp=${word.toLowerCase()}&max=1`
      );
      const data = await response.json();
      return (
        data.length > 0 && data[0].word.toLowerCase() === word.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking word validity:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitGuess = async () => {
    if (gameResult || currentGuess.length !== 5) {
      return; // Do not submit if game is over or guess is not 5 letters
    }
    const isValidWord = await checkIfWordIsValid(currentGuess.toLowerCase());
    if (!isValidWord) {
      return;
    }

    const newGuesses = guesses.map((g, index) =>
      gameBoardCompleted[index] ? g : [...g, currentGuess]
    );
    setGuesses(newGuesses);
    setCurrentGuess("");

    let newKeyboardStatus = { ...keyboardStatus };

    const updatedLetterStatus = letterStatus.map((status, gameIndex) => {
      if (gameBoardCompleted[gameIndex]) {
        return status;
      }

      const guessedLetters = currentGuess.split("");
      const correctLetters = targetWords[gameIndex].split("");
      let newStatus = Array(5).fill("");
      const matchedIndices = [];

      // First pass: check for correct letters
      guessedLetters.forEach((letter, index) => {
        if (letter === correctLetters[index]) {
          newStatus[index] = "correct";
          matchedIndices.push(index); // Track matched indices for correct letters
        }
      });

      // Second pass: check for incorrect-position letters
      guessedLetters.forEach((letter, index) => {
        if (
          newStatus[index] !== "correct" &&
          correctLetters.includes(letter) &&
          correctLetters.filter(
            (l, i) => l === letter && !matchedIndices.includes(i)
          ).length > 0
        ) {
          newStatus[index] = "incorrect-position";
          matchedIndices.push(correctLetters.indexOf(letter));
        } else if (newStatus[index] !== "correct") {
          newStatus[index] = "incorrect";
        }

        if (!newKeyboardStatus[letter]) {
          newKeyboardStatus[letter] = ["", "", "", ""]; // Initialize array for each corner
        }

        // Update the keyboardStatus based on the position in the game boards
        if (gameIndex === 0) newKeyboardStatus[letter][0] = newStatus[index];
        if (gameIndex === 1) newKeyboardStatus[letter][1] = newStatus[index];
        if (gameIndex === 2) newKeyboardStatus[letter][2] = newStatus[index];
        if (gameIndex === 3) newKeyboardStatus[letter][3] = newStatus[index];
      });

      return [...status, newStatus];
    });

    setLetterStatus(updatedLetterStatus);
    setKeyboardStatus(newKeyboardStatus);

    const updatedGameBoardCompleted = gameBoardCompleted.map(
      (completed, index) =>
        completed || currentGuess.toUpperCase() === targetWords[index]
    );

    setGameBoardCompleted(updatedGameBoardCompleted);
    setTotalGuesses(totalGuesses + 1); // Incrementing total guesses

    // Check if all game boards are completed or if total guesses exceed 9
    if (
      updatedGameBoardCompleted.every((completed) => completed) ||
      totalGuesses >= 9
    ) {
      const gameResultMessage = updatedGameBoardCompleted.every(
        (completed) => completed
      )
        ? `Congratulations!\nThe words were: ${targetWords.join(", ")}`
        : `Game Over!\nThe words were: ${targetWords.join(", ")}`;
      setGameResult(gameResultMessage);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, guesses, letterStatus]);

  return (
    <div className="App">
      <Header showInfo={handleShowInfo} />
      <div className="quordle">
        {Array.from({ length: 4 }, (_, index) => (
          <GameBoard
            key={index}
            guesses={guesses[index]}
            currentGuess={gameBoardCompleted[index] ? "" : currentGuess} // Disable input for completed boards
            letterStatus={letterStatus[index]}
            loading={loading}
          />
        ))}
      </div>
      <KeyBoard
        onGuess={handleGuess}
        onEnter={submitGuess}
        onBackspace={handleBackspace}
        keyboardStatus={keyboardStatus}
      />
      {showInfo && <About onClose={handleCloseInfo} />}
      {gameResult && (
        <div className="game-result">
          <div>{gameResult}</div>
          <button type="button" onClick={() => window.location.reload()}>
            <p>
              <span>New Game</span>
            </p>
          </button>
        </div>
      )}
      {loading && <Loader />} {/* Display loader if loading */}
    </div>
  );
};

export default App;
