const sudoku_board = document.querySelector('.sudoku_board');
for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.classList.add('s_cell');
    const row_index = Math.floor(i / 9);
    const col_index = i % 9;
    cell.setAttribute("data-row", row_index);
    cell.setAttribute("data-col", col_index);
    sudoku_board.appendChild(cell);
}
let selected_cell;
// Add a click event listener to each cell
const cells = document.querySelectorAll(".s_cell");
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => select_cell(cell, index));
});
// Function to select a cell
function select_cell(cell, index) {
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
    document.addEventListener("keydown", handle_number_input);
}
// Function to handle number input
function handle_number_input(event) {
    if (selected_cell && !isNaN(event.key) && Number(event.key) >= 1 && Number(event.key) <= 9) {
        const row_index = Number(selected_cell.getAttribute("data-row"));
        const col_index = Number(selected_cell.getAttribute("data-col"));
        if (is_input_valid(event.key, row_index, col_index)) {
            selected_cell.textContent = event.key;
        }
        // Perform any necessary checks (e.g., validate input, check if the puzzle is solved)
        // After performing the checks, remove the keydown event listener
        document.removeEventListener("keydown", handle_number_input);
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
function load_puzzle(difficulty) {
    const sudoku = puzzles[difficulty][0];
    cells.forEach((cell, index) => {
        cell.textContent = sudoku[index] !== "0" ? sudoku[index] : "";
    });
}
load_puzzle("medium");
function is_input_valid(value, row_index, col_index) {
    // Convert the cells NodeList to a 2D array (9x9) for easier row/column/grid access
    const board_array = Array.from(cells).reduce((acc, cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        if (!acc[row]) {
            acc[row] = [];
        }
        acc[row][col] = cell.textContent;
        return acc;
    }, []);
    // Check the row
    for (let col = 0; col < 9; col++) {
        if (board_array[row_index][col] === value) {
            return false;
        }
    }
    // Check the column
    for (let row = 0; row < 9; row++) {
        if (board_array[row][col_index] === value) {
            return false;
        }
    }
    // Check the 3x3 grid
    const grid_start_row = Math.floor(row_index / 3) * 3;
    const grid_start_col = Math.floor(col_index / 3) * 3;
    for (let row = grid_start_row; row < grid_start_row + 3; row++) {
        for (let col = grid_start_col; col < grid_start_col + 3; col++) {
            if (board_array[row][col] === value) {
                return false;
            }
        }
    }
    // If the input passes all checks, it is valid according to Sudoku rules
    return true;
}
