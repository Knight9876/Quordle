# Quordle Game

Welcome to Quordle Game! This is a challenging word-guessing game inspired by the popular Wordle game but with a twist – you have to guess four different words simultaneously.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Introduction

The Quordle Game is an advanced version of the Wordle game where players have to guess four hidden five-letter words within a limited number of attempts. Each word is guessed simultaneously, and feedback is provided for each word independently.

## Features

- **Multiple Game Boards**: Four game boards to guess four different words simultaneously.
- **Virtual and Physical Keyboard Support**: Input guesses using either the on-screen keyboard or your physical keyboard.
- **Dynamic Feedback**: Immediate feedback on your guesses for each game board, highlighting correct and incorrect letters.
- **Responsive Design**: Play the game on any device, whether it's a desktop, tablet, or mobile phone.
- **Random Word Generation**: Each game features four new random words to keep the challenge fresh.

## Technologies Used

- **React**: For building the user interface.
- **CSS**: For styling the application.
- **APIs**: To fetch random five-letter words.

## Installation

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/Knight9876/Quordle.git
   cd Quordle
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

   The game should now be running on `http://localhost:3000`.

## Usage

1. Open the game in your browser.
2. Use the on-screen keyboard or your physical keyboard to input a five-letter word.
3. Press `Enter` to submit your guess.
4. Observe the feedback on each game board:
   - Green indicates the letter is in the correct position.
   - Yellow indicates the letter is in the word but in the wrong position.
   - Grey indicates the letter is not in the word.
5. Continue guessing until you identify all four target words or exhaust your attempts.

## Game Rules

1. Guess the hidden five-letter words within a limited number of attempts.
2. Each guess is applied to all four game boards simultaneously.
3. After each guess, the color of the tiles will change to show how close your guess was to each word:
   - **Green**: Correct letter in the correct position.
   - **Yellow**: Correct letter in the wrong position.
   - **Grey**: Incorrect letter.
4. Use the feedback to refine your guesses and find all target words.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request. Please ensure your contributions align with the project's coding standards and practices.

## Acknowledgements

- Inspired by the original Wordle game.
- Thanks to the developers and contributors of the libraries and APIs used in this project.

---

Enjoy playing the Quordle Game! If you have any questions or feedback, please reach out.
