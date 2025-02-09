import { useState } from "react";

//The square component renders an individual square with a value and a highlight
function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button
      //if isHighlighted is true, the square will be highlighted
      className={`square ${isHighlighted ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  //Tracks whose turn it is, X or O
  const [xIsNext, setXIsNext] = useState(true);

  //Tracks the values of the squares
  const [squares, setSquares] = useState(Array(9).fill(null));

  //Tracks the last clicked square
  const [lastSquareIndex, setLastSquareIndex] = useState(null);

  //Function to handle square clicks
  function handleClick(i) {
    //If the square is filled or there's a winner, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //Make a copy of the squares array to avoid changing anything
    const nextSquares = squares.slice();

    //Set the value of the square based on those turn it is
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //Update squares array
    setSquares(nextSquares);
    //Update the next player
    setXIsNext(!xIsNext);
    //Save the index of the last clicked square to highlight it
    setLastSquareIndex(i);
  }

  //If there is a winner, calculate it
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {/*Display game status */}
      <div className="status">{status}</div>

      <div className="board-row">
        <Square
          value={squares[0]} //Value of the square
          onSquareClick={() => handleClick(0)} //Click handler for the square
          isHighlighted={lastSquareIndex === 0} //Highlight the square if it was the last clicked
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isHighlighted={lastSquareIndex === 1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isHighlighted={lastSquareIndex === 2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isHighlighted={lastSquareIndex === 3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isHighlighted={lastSquareIndex === 4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isHighlighted={lastSquareIndex === 5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isHighlighted={lastSquareIndex === 6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isHighlighted={lastSquareIndex === 7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isHighlighted={lastSquareIndex === 8}
        />
      </div>
    </>
  );
}

//Function to calculate the winner
function calculateWinner(squares) {
  //All possible winning conditions
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

  //Loop through all possible conditions, compare if all values are the same in any of them
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  //If not, return null
  return null;
}
