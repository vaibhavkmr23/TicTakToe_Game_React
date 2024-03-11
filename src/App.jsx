import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([])

  function handleSelectSquare(rowIndex,colIndex) {
    setActivePlayer((initialValue) => (initialValue === "X" ? "O" : "X"));
    
    
    setGameTurns((prevTurns)=>{
      let CurrentPlayer = "X"
      if(prevTurns.length > 0 && prevTurns[0].player === "X"){
        CurrentPlayer = "O"
      }
      const updatedTurns =  [{square: {row: rowIndex, col: colIndex}, player: CurrentPlayer },...prevTurns]
      return updatedTurns
  })
  }
  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log />
    </menu>
  );
}

export default App;
