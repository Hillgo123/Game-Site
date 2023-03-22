const rows = 8;
const columns = 9;
const board = document.getElementById("board");
const cell_size = 80;
let current_player = "red";
let game_matrix = [];

let game_over = false;

function create_board() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");


            cell.onmouseover = () => handle_mouse_over(j);
            cell.onmouseout = () => handle_mouse_out(j);
            cell.onclick = () => handle_click(j);

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
    if (game_over) {
        return
    };

    let target_row = find_first_empty_cell(column);
    if (target_row !== -1) {
        game_matrix[target_row][column].classList.remove("hidden");
        game_matrix[target_row][column].classList.add(current_player);

        if (check_victory(target_row, column)) {
            setTimeout(() => {
                alert(current_player.toUpperCase() + " wins!");
                game_over = true;
            }, 25);
        } else {
            current_player = current_player === "red" ? "yellow" : "red";
            update_hover_tokens();
        }
    }
}

function find_first_empty_cell(column) {
    for (let row = rows - 1; row >= 0; row--) {
        if (!game_matrix[row][column].classList.contains("red") &&
            !game_matrix[row][column].classList.contains("yellow")) {
            return row;
        }
    }
    return -1;
}

function check_victory(row, column) {
    return (
        check_direction(row, column, 1, 0, true) ||
        check_direction(row, column, 0, 1, true) ||
        check_direction(row, column, 1, 1, true) ||
        check_direction(row, column, 1, -1, true)
    );
}

function check_direction(row, column, row_dir, col_dir, highlight = false) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        let newRow = row + i * row_dir;
        let newCol = column + i * col_dir;
        if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < columns &&
            game_matrix[newRow][newCol].classList.contains(current_player)
        ) {
            count++;
            if (count === 4) {
                if (highlight) {
                    highlight_winning_tokens(row, column, row_dir, col_dir);
                }
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function highlight_winning_tokens(row, column, rowDir, colDir) {
    for (let i = 0; i < 4; i++) {
        let new_row = row + i * rowDir;
        let new_col = column + i * colDir;
        game_matrix[new_row][new_col].classList.add("winning");
    }
}

const hover_row = document.getElementById("hover_row");

function create_hover_tokens() {
    for (let j = 0; j < columns; j++) {
        const token = document.createElement("div");
        token.classList.add("hover_token", "hidden", current_player);
        hover_row.appendChild(token);
    }
}

function update_hover_tokens() {
    for (let j = 0; j < columns; j++) {
        hover_row.children[j].classList.remove("red", "yellow");
        hover_row.children[j].classList.add(current_player);
    }
}
function handle_mouse_over(column) {
    if (game_over) {
        return
    };
    hover_row.children[column].classList.remove("hidden");
}

function handle_mouse_out(column) {
    hover_row.children[column].classList.add("hidden");
}

function reset_board() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            game_matrix[i][j].classList.remove("red", "yellow", "hidden", "winning");
        }
    }
    current_player = "red";
    game_over = false;
    update_hover_tokens();
}

const restart_button = document.getElementById("restart_button");

restart_button.addEventListener("click", reset_board);

create_hover_tokens();
create_board();
