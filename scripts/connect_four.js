const rows = 8;
const columns = 9;
const board = document.getElementById("board");
const cell_size = 80;
let current_player = "red";
let game_matrix = [];

let game_over = false;

function create_board() {
    // Create the cells for each column
    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Add event handlers
            cell.onmouseover = () => handle_mouse_over(j);
            cell.onmouseout = () => handle_mouse_out(j);
            cell.onclick = () => handle_click(j);

            // Create the token
            const token = document.createElement("div");
            token.classList.add("token", "hidden");
            cell.appendChild(token);
            board.appendChild(cell);
            row.push(token);
        }

        game_matrix.push(row);
    }
}


function handle_click(column) {
    // Check if the game is over. If yes, do nothing.
    if (game_over) {
        return;
    };

    // Find the first empty cell in the selected column.
    let target_row = find_first_empty_cell(column);

    // Check if the column is not full. If yes, do nothing.
    if (target_row !== -1) {
        // Remove the hidden class from the selected cell.
        game_matrix[target_row][column].classList.remove("hidden");
        // Add the current player class to the selected cell.
        game_matrix[target_row][column].classList.add(current_player);

        // Check if the current player has won.
        if (check_victory(target_row, column)) {
            // If yes, display an alert with the winner, and stop the game.
            setTimeout(() => {
                alert(current_player.toUpperCase() + " wins!");
                game_over = true;
            }, 25);
        } else {
            // If not, change the current player
            current_player = current_player === "red" ? "yellow" : "red";
            update_hover_tokens();
        }
    }
}

function find_first_empty_cell(column) {
    // Loop from the bottom of the column to the top.
    for (let row = rows - 1; row >= 0; row--) {
        // Check if the cell is empty.
        if (!game_matrix[row][column].classList.contains("red") &&
            !game_matrix[row][column].classList.contains("yellow")) {
            // If yes, return its row.
            return row;
        }
    }
    // If the column is full, return -1.
    return -1;
}

function check_victory(row, column) {
    // Check if the last move made by the player is a winning move.
    // Return true if it is, false otherwise.

    // Define the directions in which we will check for a victory.
    const directions = [
        { row_dir: 1, col_dir: 0 },
        { row_dir: 0, col_dir: 1 },
        { row_dir: 1, col_dir: 1 },
        { row_dir: 1, col_dir: -1 },
    ];

    // Check each direction for a victory.
    for (const direction of directions) {
        const winning_positions = check_direction(
            row,
            column,
            direction.row_dir,
            direction.col_dir
        );
        if (winning_positions.length === 4) {
            highlight_winning_tokens(winning_positions);
            return true;
        }
    }

    return false;
}

// This function checks the game matrix to see if there is a winning line.
// It returns an array of positions that make up the winning line.
function check_direction(row, column, row_dir, col_dir) {
    // The count variable tracks how many checkers of the current player are in a row.
    let count = 0;
    // The winning_positions variable tracks the positions that make up a winning line.
    let winning_positions = [];
    // Loop over the rows and columns in the specified direction.
    for (let i = -3; i <= 3; i++) {
        let new_row = row + i * row_dir;
        let new_col = column + i * col_dir;
        // Check if the position is on the board.
        if (
            new_row >= 0 &&
            new_row < rows &&
            new_col >= 0 &&
            new_col < columns &&
            // Check if the position contains a checker of the current player.
            game_matrix[new_row][new_col].classList.contains(current_player)
        ) {
            count++;
            // Add the position to the winning line.
            winning_positions.push({ row: new_row, column: new_col });
            if (count === 4) {
                // If the winning line is found, return the positions.
                return winning_positions;
            }
        } else {
            // If the position is not on the board or does not contain a checker of the current player,
            // reset the count and winning_positions variables.
            count = 0;
            winning_positions = [];
        }
    }
    // If no winning line was found, return an empty array.
    return [];
}

function highlight_winning_tokens(winning_positions) {
    // Add the winning class to the winning tokens.
    for (const position of winning_positions) {
        game_matrix[position.row][position.column].classList.add("winning");
    }
}

const hover_row = document.getElementById("hover_row");

function create_hover_tokens() {
    // Create and add the hover token divs to the hover row
    for (let j = 0; j < columns; j++) {
        const token = document.createElement("div");
        token.classList.add("hover_token", "hidden", current_player);
        hover_row.appendChild(token);
    }
}

function update_hover_tokens() {
    // Remove the hover token divs from the hover row
    for (let j = 0; j < columns; j++) {
        hover_row.children[j].classList.remove("red", "yellow");
        hover_row.children[j].classList.add(current_player);
    }
}
function handle_mouse_over(column) {
    // Show the hover token divs for the column of the mouseover
    if (game_over) {
        return
    };
    hover_row.children[column].classList.remove("hidden");
}

function handle_mouse_out(column) {
    // Hide the hover token divs for the column of the mouseout
    hover_row.children[column].classList.add("hidden");
}

function reset_board() {
    //reset the board
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            game_matrix[i][j].classList.remove("red", "yellow", "hidden", "winning");
        }
    }
    //reset the rest of the variables
    current_player = "red";
    game_over = false;
    update_hover_tokens();
}

const restart_button = document.getElementById("restart_button");

restart_button.addEventListener("click", reset_board);

create_hover_tokens();
create_board();
