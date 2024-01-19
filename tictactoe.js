document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const status = document.createElement('div');
  status.classList.add('status');
  board.insertAdjacentElement('beforebegin', status);

  let squares = Array(9).fill(null);
  let xIsNext = true;

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    xIsNext = !xIsNext;
    render();
  }

  function render() {
    status.textContent = calculateStatus();
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.textContent = squares[i];
      square.addEventListener('click', () => handleClick(i));
      board.appendChild(square);
    }
  }

  function calculateStatus() {
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  }

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

  render();
});
