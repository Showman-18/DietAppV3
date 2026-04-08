import { useState, useEffect } from 'react'  
import './App.css'  
  
function App() {  
  const ROWS = 6  
  const COLS = 7  
  const EMPTY = 0  
  const RED = 1  
  const YELLOW = 2  
  const AI_PLAYER = YELLOW  
  
  const [board, setBoard] = useState(Array(ROWS * COLS).fill(EMPTY))  
  const [currentPlayer, setCurrentPlayer] = useState(RED)  
  const [winner, setWinner] = useState(null)  
  const [gameOver, setGameOver] = useState(false)  
  const [isAIEnabled, setIsAIEnabled] = useState(false)  
  const [isAIThinking, setIsAIThinking] = useState(false)  
  
  // Evaluate a board position  
  const evaluateBoard = (testBoard) => {  
    let score = 0  
  
    // Check all possible 4-in-a-row patterns  
    const directions = [  
      { dr: 0, dc: 1 }, // horizontal  
      { dr: 1, dc: 0 }, // vertical  
      { dr: 1, dc: 1 }, // diagonal down-right  
      { dr: 1, dc: -1 } // diagonal down-left  
    ]  
  
    for (let row = 0; row < ROWS; row++) {  
      for (let col = 0; col < COLS; col++) {  
        for (const { dr, dc } of directions) {  
          let aiCount = 0  
          let playerCount = 0  
          let emptyCount = 0  
  
          for (let i = 0; i < 4; i++) {  
            const r = row + dr * i  
            const c = col + dc * i  
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break  
  
            const idx = r * COLS + c  
            if (testBoard[idx] === AI_PLAYER) aiCount++  
            else if (testBoard[idx] === RED) playerCount++  
            else emptyCount++  
          }  
  
          // Score based on piece count  
          if (playerCount > 0 && aiCount > 0) continue // Mixed, skip  
  
          if (aiCount === 4) score += 10000 // AI wins  
          else if (aiCount === 3 && emptyCount === 1) score += 500  
          else if (aiCount === 2 && emptyCount === 2) score += 50  
          else if (aiCount === 1 && emptyCount === 3) score += 5  
  
          if (playerCount === 4) score -= 10000 // Player wins  
          else if (playerCount === 3 && emptyCount === 1) score -= 500  
          else if (playerCount === 2 && emptyCount === 2) score -= 50  
          else if (playerCount === 1 && emptyCount === 3) score -= 5  
        }  
      }  
    }  
  
    // Bonus for center control  
    for (let row = 0; row < ROWS; row++) {  
      const centerCol = COLS / 2  
      const idx = row * COLS + Math.floor(centerCol)  
      if (testBoard[idx] === AI_PLAYER) score += 3  
      else if (testBoard[idx] === RED) score -= 3  
    }  
  
    return score  
  }  
  
  // Minimax with alpha-beta pruning  
  const minimax = (testBoard, depth, maxDepth, isMaximizing, alpha, beta) => {  
    const terminalWinner = checkWinner(testBoard)  
  
    if (depth === maxDepth || gameOver || terminalWinner) {  
      if (terminalWinner === AI_PLAYER) return 10000 - depth  
      if (terminalWinner === RED) return -10000 + depth  
      if (testBoard.every(cell => cell !== EMPTY)) return 0  
      return evaluateBoard(testBoard)  
    }  
  
    if (isMaximizing) {  
      let maxEval = -Infinity  
      for (let col = 0; col < COLS; col++) {  
        const newBoard = tryMove(testBoard, col, AI_PLAYER)  
        if (newBoard === null) continue  
  
        const evalScore = minimax(newBoard, depth + 1, maxDepth, false, alpha, beta)  
        maxEval = Math.max(maxEval, evalScore)  
        alpha = Math.max(alpha, evalScore)  
        if (beta <= alpha) break  
      }  
      return maxEval === -Infinity ? evaluateBoard(testBoard) : maxEval  
    } else {  
      let minEval = Infinity  
      for (let col = 0; col < COLS; col++) {  
        const newBoard = tryMove(testBoard, col, RED)  
        if (newBoard === null) continue  
  
        const evalScore = minimax(newBoard, depth + 1, maxDepth, true, alpha, beta)  
        minEval = Math.min(minEval, evalScore)  
        beta = Math.min(beta, evalScore)  
        if (beta <= alpha) break  
      }  
      return minEval === Infinity ? evaluateBoard(testBoard) : minEval  
    }  
  }  
  
  // Try to make a move and return new board or null if invalid  
  const tryMove = (testBoard, col, player) => {  
    const newBoard = [...testBoard]  
    for (let row = ROWS - 1; row >= 0; row--) {  
      const idx = row * COLS + col  
      if (newBoard[idx] === EMPTY) {  
        newBoard[idx] = player  
        return newBoard  
      }  
    }  
    return null  
  }  
  
  // Get AI's best move  
  const getAIMove = (testBoard) => {  
    let bestScore = -Infinity  
    let bestMove = null  
  
    for (let col = 0; col < COLS; col++) {  
      const newBoard = tryMove(testBoard, col, AI_PLAYER)  
      if (newBoard === null) continue  
  
      const score = minimax(newBoard, 0, 5, false, -Infinity, Infinity)  
  
      if (score > bestScore) {  
        bestScore = score  
        bestMove = col  
      }  
    }  
  
    return bestMove  
  }  
  
  // AI makes a move after a short delay  
  useEffect(() => {  
    if (isAIEnabled && currentPlayer === AI_PLAYER && !gameOver && !winner && !isAIThinking) {  
      setIsAIThinking(true)  
      const timer = setTimeout(() => {  
        try {  
          const aiMove = getAIMove(board)  
          if (aiMove !== null) {  
            dropPiece(aiMove, true)  
          }  
        } finally {  
          // Always clear thinking state, even if AI evaluation throws.  
          setIsAIThinking(false)  
        }  
      }, 500)  
      return () => clearTimeout(timer)  
    }  
  }, [currentPlayer, isAIEnabled, gameOver, winner, board])  
  
  const checkWinner = (newBoard) => {  
    // Check horizontal  
    for (let row = 0; row < ROWS; row++) {  
      for (let col = 0; col < COLS - 3; col++) {  
        const idx = row * COLS + col  
        if (newBoard[idx] !== EMPTY &&  
            newBoard[idx] === newBoard[idx + 1] &&  
            newBoard[idx] === newBoard[idx + 2] &&  
            newBoard[idx] === newBoard[idx + 3]) {  
          return newBoard[idx]  
        }  
      }  
    }  
  
    // Check vertical  
    for (let col = 0; col < COLS; col++) {  
      for (let row = 0; row < ROWS - 3; row++) {  
        const idx = row * COLS + col  
        if (newBoard[idx] !== EMPTY &&  
            newBoard[idx] === newBoard[idx + COLS] &&  
            newBoard[idx] === newBoard[idx + COLS * 2] &&  
            newBoard[idx] === newBoard[idx + COLS * 3]) {  
          return newBoard[idx]  
        }  
      }  
    }  
  
    // Check diagonal (bottom-left to top-right)  
    for (let row = 3; row < ROWS; row++) {  
      for (let col = 0; col < COLS - 3; col++) {  
        const idx = row * COLS + col  
        if (newBoard[idx] !== EMPTY &&  
            newBoard[idx] === newBoard[idx - COLS + 1] &&  
            newBoard[idx] === newBoard[idx - COLS * 2 + 2] &&  
            newBoard[idx] === newBoard[idx - COLS * 3 + 3]) {  
          return newBoard[idx]  
        }  
      }  
    }  
  
    // Check diagonal (top-left to bottom-right)  
    for (let row = 0; row < ROWS - 3; row++) {  
      for (let col = 0; col < COLS - 3; col++) {  
        const idx = row * COLS + col  
        if (newBoard[idx] !== EMPTY &&  
            newBoard[idx] === newBoard[idx + COLS + 1] &&  
            newBoard[idx] === newBoard[idx + COLS * 2 + 2] &&  
            newBoard[idx] === newBoard[idx + COLS * 3 + 3]) {  
          return newBoard[idx]  
        }  
      }  
    }  
  
    return null  
  }  
  
  const dropPiece = (col, isAI = false) => {  
    if (gameOver || winner) return  
    if (!isAI && isAIEnabled && currentPlayer === AI_PLAYER) return // Prevent human input during AI turn  
  
    const newBoard = [...board]  
      
    // Find the lowest empty row in this column  
    for (let row = ROWS - 1; row >= 0; row--) {  
      const idx = row * COLS + col  
      if (newBoard[idx] === EMPTY) {  
        newBoard[idx] = currentPlayer  
          
        // Check for winner  
        const gameWinner = checkWinner(newBoard)  
        if (gameWinner) {  
          setWinner(gameWinner)  
          setGameOver(true)  
        }  
          
        // Check for draw  
        if (!gameWinner && newBoard.every(cell => cell !== EMPTY)) {  
          setGameOver(true)  
        }  
          
        setBoard(newBoard)  
        setCurrentPlayer(currentPlayer === RED ? YELLOW : RED)  
        return  
      }  
    }  
  }  
  
  const resetGame = () => {  
    setBoard(Array(ROWS * COLS).fill(EMPTY))  
    setCurrentPlayer(RED)  
    setWinner(null)  
    setGameOver(false)  
    setIsAIThinking(false)  
  }  
  
  const startGameWithAI = () => {  
    setBoard(Array(ROWS * COLS).fill(EMPTY))  
    setCurrentPlayer(RED)  
    setWinner(null)  
    setGameOver(false)  
    setIsAIEnabled(true)  
    setIsAIThinking(false)  
  }  
  
  const startGameWithoutAI = () => {  
    setBoard(Array(ROWS * COLS).fill(EMPTY))  
    setCurrentPlayer(RED)  
    setWinner(null)  
    setGameOver(false)  
    setIsAIEnabled(false)  
    setIsAIThinking(false)  
  }  
  
  const getCircleColor = (index) => {  
    if (board[index] === RED) return 'red'  
    if (board[index] === YELLOW) return 'yellow'  
    return 'white'  
  }  
  
  const getWinnerText = () => {  
    if (winner === RED) return 'Red Wins!'  
    if (winner === YELLOW) return 'Yellow Wins!'  
    if (gameOver && !winner) return "It's a Draw!"  
    return `Current Player: ${currentPlayer === RED ? 'Red' : 'Yellow'}`  
  }  
  
  return (  
    <div>  
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Connect 4</h1>  
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '14px', color: '#666' }}>  
        {isAIEnabled ? 'ð¤ Playing against AI (Yellow)' : 'ð¥ Two Player Mode'}  
      </div>  
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>  
        {isAIThinking ? 'ð¤ AI is thinking...' : getWinnerText()}  
      </div>  
      <div className="container">  
        <div className="grid">  
          {board.map((cell, index) => (  
            <div   
              key={index}   
              className="gridBox"  
              onClick={() => dropPiece(index % COLS)}  
              style={{ cursor: (gameOver || isAIThinking) ? 'default' : 'pointer' }}  
            >  
              <div   
                className="boxCircle"  
                style={{ backgroundColor: getCircleColor(index) }}  
              ></div>  
            </div>  
          ))}  
        </div>  
      </div>  
      <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>  
        <button   
          onClick={resetGame}  
          style={{  
            padding: '10px 20px',  
            fontSize: '16px',  
            cursor: 'pointer',  
            backgroundColor: '#4CAF50',  
            color: 'white',  
            border: 'none',  
            borderRadius: '5px'  
          }}  
        >  
          Reset Game  
        </button>  
        <button   
          onClick={startGameWithAI}  
          style={{  
            padding: '10px 20px',  
            fontSize: '16px',  
            cursor: 'pointer',  
            backgroundColor: '#2196F3',  
            color: 'white',  
            border: 'none',  
            borderRadius: '5px'  
          }}  
        >  
          Play vs AI  
        </button>  
        <button   
          onClick={startGameWithoutAI}  
          style={{  
            padding: '10px 20px',  
            fontSize: '16px',  
            cursor: 'pointer',  
            backgroundColor: '#FF9800',  
            color: 'white',  
            border: 'none',  
            borderRadius: '5px'  
          }}  
        >  
          Two Player  
        </button>  
      </div>  
    </div>  
  )  
}  
  
export default App  
  
