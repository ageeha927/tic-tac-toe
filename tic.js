let currentPlayer = 1
let gameBoard = ['', '', '', '', '', '', '', '', '']
let gameOver = false
let player1Wins = 0
let player2Wins = 0

function exit() {
    window.close()
}

// start a new game
function start() {
    currentPlayer = 1
    gameBoard = ['', '', '', '', '', '', '', '', '']
    gameOver = false;
    updatePlayerText()
    updateBoardDisplay()
    // remove highlight
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => {
        tile.classList.remove('winning')
    })
}

// player making a move
function makeMove(tile) {
    if (!gameOver && gameBoard[tile - 1] === '') {
        gameBoard[tile - 1] = currentPlayer === 1 ? 'X' : 'O'
        updateBoardDisplay()
        checkWinner()
        currentPlayer = currentPlayer === 1 ? 2 : 1
        updatePlayerText()
    }
}

// update the player text
function updatePlayerText() {
    const textPlayer = document.getElementById('textPlayer')
    textPlayer.textContent = `(Current Player ${currentPlayer})`
}

// update the visual display of the game board
function updateBoardDisplay() {
    for (let i = 0; i < gameBoard.length; i++) {
        const tile = document.getElementById(`tile${i + 1}`)
        tile.textContent = gameBoard[i]
    }
}

// check for winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningTiles(combo)
            gameOver = true
            if (currentPlayer === 1) {
                player1Wins++
                document.getElementById('player1').textContent = `Player 1 Wins: ${player1Wins}`
                document.getElementById('result').textContent = `Player 1 Wins!`
				startConfetti
            } else {
                player2Wins++;
                document.getElementById('player2').textContent = `Player 2 Wins: ${player2Wins}`
                document.getElementById('result').textContent = `Player 2 Wins!`
				startConfetti
            }
            return
        }
    }

    // check for a tie
    if (!gameBoard.includes('')) {
        gameOver = true
        document.getElementById('result').textContent = "It's a tie!"
    }
}

// highlight the winning tiles
function highlightWinningTiles(combo) {
    for (const i of combo) {
        const tile = document.getElementById(`tile${i + 1}`)
        tile.classList.add('winning')
    }
}