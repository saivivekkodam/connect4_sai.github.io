
function checkWin() {
  
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
            if (board[row][col] !== 0 && board[row][col] === board[row][col + 1] &&board[row][col] === board[row][col + 2] &&board[row][col] === board[row][col + 3]) {
                return true;
            }
        }
    }

    for (let row = 0; row <= ROWS - 4; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] !== 0 &&board[row][col] === board[row + 1][col] &&board[row][col] === board[row + 2][col] &&board[row][col] === board[row + 3][col]) {
                return true;
            }
        }
    }
  
    for (let row = 0; row <= ROWS - 4; row++) {
        for (let col = 0; col <= COLS - 4; col++) {
            if (board[row][col] !== 0 &&board[row][col] === board[row + 1][col + 1] &&board[row][col] === board[row + 2][col + 2] &&board[row][col] === board[row + 3][col + 3]) {
                return true;
            }
        }
    }
    for (let row = 0; row <= ROWS - 4; row++) {
        for (let col = 3; col < COLS; col++) {
            if (board[row][col] !== 0 &&board[row][col] === board[row + 1][col - 1] &&board[row][col] === board[row + 2][col - 2] &&board[row][col] === board[row + 3][col - 3]) {
                return true;
            }
        }
    }
    return false;
}

function structure() {
    const boardElement = document.getElementById("board");
    for (let row = 0; row < ROWS; row++) {
        board[row] = Array(COLS).fill(0);
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            boardElement.appendChild(cell);
        }
        boardElement.appendChild(document.createElement("br"));
    }
}

function coins(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            const disc = document.createElement("div");
            disc.classList.add("disc", currentPlayer === 1 ? "red" : "yellow");
            cell.appendChild(disc);
            void cell.offsetWidth;
            disc.style.top = "0";
            return true;
        }
    }
    return false; 
}


function turnchange() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function refreshPage() {
    location.reload(); 
}


function resetGame() {
    board = [];
    currentPlayer = 1;
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    // createBoard();
    init();
}

function init() {
    structure();
  
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", () => {
            const col = parseInt(cell.getAttribute("data-col"));
            if (coins(col)) {
                if (checkWin()) {
                    document.getElementById("board").classList.add("blur");
                    alert(`Player ${currentPlayer} wins!`);
                    document.getElementById("dispbutton").style.display = "block";
                } else {
                    turnchange();
                }
            }
        });
    });
    document.getElementById("reset").addEventListener("click", resetGame);
}


let currentPlayer = 1;
let board = [];
const ROWS = 6;
const COLS = 7;
init();
