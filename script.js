document.addEventListener("DOMContentLoaded", () => {
    generateGrid();
});

function generateGrid() {
    let gridSize = parseInt(document.getElementById("gridSize").value);
    let filledPercentage = parseInt(document.getElementById("filledPercentage").value) / 100;
    let sudokuContainer = document.getElementById("sudoku-container");
    sudokuContainer.innerHTML = "";

    let N = gridSize * gridSize;
    sudokuContainer.style.gridTemplateColumns = `repeat(${N}, 1fr)`;

    let grid = generateSudoku(N, gridSize, filledPercentage);

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            let cell = document.createElement("input");
            cell.type = "text";
            cell.classList.add("sudoku-cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.maxLength = 1;

            if ((row + 1) % gridSize === 0 && row !== N - 1) {
                cell.dataset.rowEnd = "true";
            }
            if ((col + 1) % gridSize === 0 && col !== N - 1) {
                cell.dataset.colEnd = "true";
            }

            if (grid[row][col] !== 0) {
                cell.value = grid[row][col];
                cell.readOnly = true;
                cell.classList.add("preset");
            } else {
                cell.addEventListener("input", checkValidity);
            }

            sudokuContainer.appendChild(cell);
        }
    }
}

function generateSudoku(N, gridSize, filledPercentage) {
    let grid = Array.from({ length: N }, () => Array(N).fill(0));

    function isValid(row, col, num) {
        for (let i = 0; i < N; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false;
        }

        let boxRowStart = Math.floor(row / gridSize) * gridSize;
        let boxColStart = Math.floor(col / gridSize) * gridSize;
        
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (grid[boxRowStart + r][boxColStart + c] === num) return false;
            }
        }

        return true;
    }

    function fillGrid() {
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (grid[row][col] === 0) {
                    let numbers = [...Array(N).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);
                    
                    for (let num of numbers) {
                        if (isValid(row, col, num)) {
                            grid[row][col] = num;
                            if (fillGrid()) return true;
                            grid[row][col] = 0;
                        }
                    }

                    return false;
                }
            }
        }
        return true;
    }

    fillGrid();

    // Suppression des valeurs en fonction du pourcentage choisi
    let totalCells = N * N;
    let cellsToRemove = Math.floor(totalCells * (1 - filledPercentage));

    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * N);
        let col = Math.floor(Math.random() * N);

        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            cellsToRemove--;
        }
    }

    return grid;
}


function checkValidity(event) {
    let cell = event.target;
    let value = cell.value;
    let row = parseInt(cell.dataset.row);
    let col = parseInt(cell.dataset.col);
    let gridSize = parseInt(document.getElementById("gridSize").value);
    let N = gridSize * gridSize;

    if (!/^[1-9]$/.test(value) || parseInt(value) > N) {
        cell.value = "";
        return;
    }

    let cells = document.querySelectorAll(".sudoku-cell");
    let error = false;

    for (let i = 0; i < N; i++) {
        let rowCell = cells[row * N + i];
        let colCell = cells[i * N + col];

        if (i !== col && rowCell.value === value) error = true;
        if (i !== row && colCell.value === value) error = true;
    }

    let boxRowStart = Math.floor(row / gridSize) * gridSize;
    let boxColStart = Math.floor(col / gridSize) * gridSize;

    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            let boxCell = cells[(boxRowStart + r) * N + (boxColStart + c)];
            if (boxCell !== cell && boxCell.value === value) error = true;
        }
    }

    if (error) {
        cell.classList.add("error");
    } else {
        cell.classList.remove("error");
    }

    checkWin();
}

function checkWin() {
    let cells = document.querySelectorAll(".sudoku-cell");
    let isComplete = true;
    
    for (let cell of cells) {
        if (cell.value === "" || cell.classList.contains("error")) {
            isComplete = false;
            break;
        }
    }

    let message = document.getElementById("message");
    message.textContent = isComplete ? "Félicitations ! Vous avez complété la grille !" : "";
}
