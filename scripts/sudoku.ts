const sudokuBoard = document.querySelector('.sudoku_board');

for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell_');
    sudokuBoard.appendChild(cell);
}

let selected_cell: Element;

// Add a click event listener to each cell
const cells = document.querySelectorAll(".cell_");
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => select_cell(cell, index));
});

// Function to select a cell
function select_cell(cell: Element, index: number) {
    if (cell.textContent !== "") {
        // Skip cells that are pre-filled with numbers
        return;
    }

    if (selected_cell) {
        selected_cell.classList.remove("selected");
    }
    selected_cell = cell;
    selected_cell.classList.add("selected");

    // Add a keydown event listener to handle number input
    document.addEventListener("keydown", handleNumberInput);
}

// Function to handle number input
function handleNumberInput(event: any) {
    if (selected_cell && !isNaN(event.key) && parseInt(event.key) >= 1 && parseInt(event.key) <= 9) {
        selected_cell.textContent = event.key;

        // Perform any necessary checks (e.g., validate input, check if the puzzle is solved)
        // After performing the checks, remove the keydown event listener
        document.removeEventListener("keydown", handleNumberInput);
    }
}

const puzzles = {
    easy: [
        "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
    ],
    medium: [
        "009748000700000800020109005900000000000906100804000096000000040300412007000050068",
    ],
    hard: [
        "100007090030020008009600500005300900010080002600004000000513020000090046020007000",
    ],
};

// Load a puzzle into the game board
function load_puzzle(difficulty: string) {
    const puzzle = puzzles[difficulty][0];
    cells.forEach((cell, index) => {
        cell.textContent = puzzle[index] !== "0" ? puzzle[index] : "";
    });
}

load_puzzle("hard");