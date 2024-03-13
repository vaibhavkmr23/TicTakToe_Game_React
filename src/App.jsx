import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./Components/GameOver";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let CurrentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    CurrentPlayer = "O";
  }
  return CurrentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setplayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  // have to do Deep Copy while working with array
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  function handlePlayerNameChange(symbol, newName) {
    setplayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((initialValue) => (initialValue === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      let CurrentPlayer = deriveActivePlayer(prevTurns);
      // let CurrentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   CurrentPlayer = "O";
      // }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: CurrentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            selectPlayerName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            selectPlayerName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </menu>
  );
}

export default App;
