export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      <div>Game Over!</div>
      {winner && <p>{winner} Won!!</p>}
      {!winner && <p>It's a Draw!!</p>}
      <p>
        <button>Rematch</button>
      </p>
    </div>
  );
}
