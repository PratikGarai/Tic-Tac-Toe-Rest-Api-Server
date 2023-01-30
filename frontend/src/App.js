import "./App.css";
const { useState } = require("react");

function App() {
  const [playerId, setPlayerId] = useState("");

  const createTable = (BOARD_SIZE=5) => {
    const table = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const children = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        children.push(<td key={j}>{`(${i},${j})`}</td>);
      }
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <h2>Player : {playerId ? playerId : "Not set"}</h2>

      <label htmlFor="playerId">Player ID</label>
      <input
        type="text"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
      />

      <br />
      
      <table>
        <tbody>
          {createTable()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
