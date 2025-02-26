const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.textContent = cell;
        div.addEventListener("click", handleMove);
        board.appendChild(div);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (cells[index] !== "" || checkWinner()) return;

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        return;
    }

    if (!cells.includes("")) {
        statusText.textContent = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

resetButton.addEventListener("click", () => {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    createBoard();
});

// Initialize the game
createBoard();
