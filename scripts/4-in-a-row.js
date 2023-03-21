const rows = 8;
const columns = 9;
const board = document.getElementById("board");
const cell_size = 80;
let current_player = "red";
let game_matrix = [];

function create_board() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.onmouseover = () => handle_mouse_over(j);
            cell.onmouseout = () => handle_mouse_out(j);
            cell.onclick = () => handleClick(j);
            const token = document.createElement("div");
            token.classList.add("token", "hidden");
            cell.appendChild(token);
            board.appendChild(cell);
            row.push(token);
        }
        game_matrix.push(row);
    }
}


function handleClick(column) {
    let target_row = find_first_empty_cell(column);
    if (target_row !== -1) {
        game_matrix[target_row][column].classList.remove("hidden");
        game_matrix[target_row][column].classList.add(current_player);
        if (check_victory(target_row, column)) {
            setTimeout(() => {
                alert(current_player.toUpperCase() + " wins!");
                reset_board();
            }, 500);
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
    return check_direction(row, column, 1, 0) ||
        check_direction(row, column, 0, 1) ||
        check_direction(row, column, 1, 1) ||
        check_direction(row, column, 1, -1);
}

function check_direction(row, column, row_dir, col_dir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        let new_row = row + i * row_dir;
        let new_col = column + i * col_dir;
        if (new_row >= 0 && new_row < rows && new_col >= 0 && new_col < columns &&
            game_matrix[new_row][new_col].classList.contains(current_player)) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function reset_board() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            game_matrix[i][j].classList.remove("red", "yellow", "hidden");
        }
    }
    current_player = "red";
}

const hoverRow = document.getElementById("hoverRow");

function create_hover_tokens() {
    for (let j = 0; j < columns; j++) {
        const token = document.createElement("div");
        token.classList.add("hoverToken", "hidden", current_player);
        hoverRow.appendChild(token);
    }
}

function update_hover_tokens() {
    for (let j = 0; j < columns; j++) {
        hoverRow.children[j].classList.remove("red", "yellow");
        hoverRow.children[j].classList.add(current_player);
    }
}


function handle_mouse_over(column) {
    hoverRow.children[column].classList.remove("hidden");
}

function handle_mouse_out(column) {
    hoverRow.children[column].classList.add("hidden");
}

create_hover_tokens();
create_board();

const restart_button = document.getElementById("restartButton");

restart_button.addEventListener("click", reset_board);