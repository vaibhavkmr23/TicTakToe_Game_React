import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";

function App() {
  return (
    <menu>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X"/>
          <Player initialName="Player 2" symbol="O"/>
        </ol>
        <GameBoard/>
      </div>
      LOG
    </menu>
  );
}

export default App;
