import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';
const TicTacToe = ({ playerIcon1, playerIcon2, mode }) => {
    const navigate = useNavigate();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const scoreUpdatedRef = useRef(false);
    const lastMoveWasRandom = useRef(true); // Track if last computer move was random
    // Function to calculate the winner
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };
    // Hook to check for a winner or draw
    useEffect(() => {
        const currentWinner = calculateWinner(board);
        if (currentWinner) {
            setWinner(currentWinner);
            setIsGameOver(true);
            if (!scoreUpdatedRef.current) {
                if (currentWinner === playerIcon1) {
                    setScore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
                } else if (currentWinner === playerIcon2) {
                    setScore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
                }
                scoreUpdatedRef.current = true;
            }
        } else if (board.every(square => square)) {
            setIsGameOver(true);
            scoreUpdatedRef.current = false;
        } else {
            scoreUpdatedRef.current = false;
        }
    }, [board, playerIcon1, playerIcon2]);
    // Function to handle the computer's move
    useEffect(() => {
        // Ensure the computer only makes a move if the game is still ongoing
        if (!isXNext && mode === '1player' && !isGameOver && !winner) {
            const makeBlockingMove = () => {
                const lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                ];
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    const line = [board[a], board[b], board[c]];
                    // If two player 1's icons are aligned, block the move
                    if (line.filter(val => val === playerIcon1).length === 2 && line.includes(null)) {
                        return [a, b, c].find(index => board[index] === null);
                    }
                }
                return null;
            };
    
            const blockingMove = makeBlockingMove();
            let newBoard = [...board];
    
            if (blockingMove !== null && !lastMoveWasRandom.current) {
                // If there's a blocking move available and it's time to block
                newBoard[blockingMove] = playerIcon2;
                lastMoveWasRandom.current = true; // Switch to random next time
            } else {
                // Make a random move if no blocking move or last move was a block
                const availableMoves = board.map((value, index) => (value === null ? index : null)).filter(value => value !== null);
                const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                newBoard[randomMove] = playerIcon2;
                lastMoveWasRandom.current = false; // Switch to block next time
            }
    
            // Update the board only if the game is still ongoing (no winner yet)
            setBoard(newBoard);
            setIsXNext(true);  // Switch turn back to Player 1 after the computer's move
        }
    }, [isXNext, mode, board, isGameOver, winner, playerIcon1, playerIcon2]);
    const handleClick = (index) => {
        if (board[index] || winner || isGameOver || (!isXNext && mode === '1player')) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? playerIcon1 : playerIcon2;
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsGameOver(false);
        setIsXNext(true);
        scoreUpdatedRef.current = false;
    };
    const restartGame = () => {
        navigate('/tictactoe');
    };
    const getCurrentPlayerName = () => isXNext ? "Player 1" : (mode === '1player' ? "Computer" : "Player 2");
    const getWinnerName = () => {
        if (winner === playerIcon1) return "Player 1";
        if (winner === playerIcon2) return mode === '1player' ? "Computer" : "Player 2";
        return null;
    };
    return (
        <div className="container">
            <h1 className="title"><span>Harry Potter</span> Tic Tac Toe</h1>
            <div className="scoreboard">
                <div className="score">
                    <h2>Player 1</h2>
                    <p>{score.player1}</p>
                </div>
                <div className="score">
                    <h2>{mode === '1player' ? 'Computer' : 'Player 2'}</h2>
                    <p>{score.player2}</p>
                </div>
            </div>
            {winner ? (
                <div><h2>{getWinnerName()} Wins!</h2></div>
            ) : isGameOver ? (
                <h2>It's a Draw!</h2>
            ) : (
                <h2>Next Player: {getCurrentPlayerName()}</h2>
            )}
            <div className="board">
                {board.map((value, index) => (
                    <div className="boxes" key={index} onClick={() => handleClick(index)}>
                        {value && <img src={value} alt="icon" className="gif-icon" />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset Game</button>
            <button className="restart" onClick={restartGame}>Game Modes</button>
        </div>
    );
};
export default TicTacToe;