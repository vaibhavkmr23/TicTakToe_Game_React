import { useState } from "react";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      // always update state for reference data Types(Objects & Arrays) with deepCopying
      let updatedBoard = [...prevGameBoard.map((innerArr) => [...innerArr])];
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleSelectSquare(rowIndex, colIndex)}
              >
                {playerSymbol}
              </button>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
