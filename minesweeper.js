document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#minesweeper');
    const width = 10;
    const height = 10;
    const minesCount = 20;
    let minesArray = [];
    let cellsArray = [];

    // Create Minesweeper grid
    function createGrid() {
        const mines = Array(minesCount).fill('mine');
        const empty = Array(width * height - minesCount).fill('empty');
        const gameArray = empty.concat(mines).sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            grid.appendChild(cell);
            cellsArray.push(cell);

            if (gameArray[i] === 'mine') {
                minesArray.push(i);
            }

            cell.addEventListener('click', function (e) {
                click(cell);
            });
        }

        // Add numbers
        for (let i = 0; i < cellsArray.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (cellsArray[i].classList.contains('empty')) {
                if (i > 0 && !isLeftEdge && minesArray.includes(i - 1)) total++;
                if (i > 9 && !isRightEdge && minesArray.includes(i + 1 - width)) total++;
                if (i > 10 && minesArray.includes(i - width)) total++;
                if (i > 11 && !isLeftEdge && minesArray.includes(i - 1 - width)) total++;
                if (i < 98 && !isRightEdge && minesArray.includes(i + 1)) total++;
                if (i < 90 && !isLeftEdge && minesArray.includes(i - 1 + width)) total++;
                if (i < 88 && !isRightEdge && minesArray.includes(i + 1 + width)) total++;
                if (i < 89 && minesArray.includes(i + width)) total++;

                cellsArray[i].setAttribute('data', total);
                if (total !== 0) cellsArray[i].classList.add('number');
            }
        }

        

    }

    createGrid();

    // Click on cell action
    function click(cell) {
        const currentId = cell.id;

        if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return;
        if (minesArray.includes(parseInt(currentId))) {
            gameOver(cell);
        } else {
            const total = cell.getAttribute('data');
            if (total != 0) {
                cell.classList.add('revealed');
                cell.innerHTML = total;
                return;
            }
            revealEmptyCells(cell, currentId);
        }
        cell.classList.add('revealed');
    }

    // Reveal empty cells
    function revealEmptyCells(cell, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = cellsArray[parseInt(currentId) - 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = cellsArray[parseInt(currentId) + 1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 10) {
                const newId = cellsArray[parseInt(currentId - width)].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = cellsArray[parseInt(currentId) - 1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = cellsArray[parseInt(currentId) + 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = cellsArray[parseInt(currentId) - 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = cellsArray[parseInt(currentId) + 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (currentId < 89) {
                const newId = cellsArray[parseInt(currentId) + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
        }, 10);
    }

    // Game Over
    function gameOver(cell) {
        console.log('Game Over');
        cellsArray.forEach(cell => {
            if (minesArray.includes(parseInt(cell.id))) {
                cell.classList.add('revealed');
                cell.classList.add('mine');
                cell.innerHTML = String.fromCharCode(9733); // Add this line to show the ASCII star
            }
        });
    }
});
