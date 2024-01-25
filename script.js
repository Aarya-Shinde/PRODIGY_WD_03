const board = document.getElementById('board');
        const message = document.querySelector('.message');
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }

        function handleCellClick(event) {
            const clickedCell = event.target;
            const index = clickedCell.dataset.index;

            if (gameBoard[index] === '' && gameActive) {
                gameBoard[index] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                checkForWinner();
                switchPlayer();
            }
        }

        function switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        function checkForWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    displayWinner(gameBoard[a]);
                    return;
                }
            }

            if (!gameBoard.includes('')) {
                displayDraw();
            }
        }

        function displayWinner(winner) {
            gameActive = false;
            message.textContent = `Player ${winner} wins!`;
        }

        function displayDraw() {
            gameActive = false;
            message.textContent = 'It\'s a draw!';
        }

        function resetGame() {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            message.textContent = '';
            board.innerHTML = '';
            createBoard();
        }

        createBoard();