import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(null);

  function resetGame() {
    setHistory({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
    });
    setStepNumber(0);
    setXIsNext(null);
  }

  function handleClick(i) {
    setHistory(history.slice(0, stepNumber + 1));
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory({
      history: history.concat([
        {
          squares: squares,
          lastMove: i,
        },
      ]),
    });
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }

  // function jumpTo(step) {
  //   setStepNumber({
  //     stepNumber: step,
  //   });
  // }

  function firstPlayerX() {
    setXIsNext({ xIsNext: true });
  }

  function firstPlayerO() {
    setXIsNext({ xIsNext: false });
  }

  function undoMove() {
    stepNumber > 0 &&
      setStepNumber({
        stepNumber: stepNumber - 1,
      });
    setXIsNext(!xIsNext);
  }

  function redoMove() {
    setStepNumber({
      stepNumber: stepNumber + 1,
    });
    setXIsNext(!xIsNext);
  }

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!winner && history.length === 10) {
    status = "It was a tie!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      {xIsNext == null && (
        <div>
          <h2>Click on who should go first!</h2>
          <div>
            <button onClick={firstPlayerX}>X</button>
            <button onClick={firstPlayerO}>O</button>
          </div>
        </div>
      )}
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        {xIsNext !== null && <div>{status}</div>}
        {/* <ol>{moves}</ol> */}
        {stepNumber > 0 && <button onClick={undoMove}>Undo</button>}
        {stepNumber < history.length - 1 && (
          <button onClick={redoMove}>Redo</button>
        )}
        {winner || history.length === 10 ? (
          <button onClick={resetGame}>Start a New Game</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
