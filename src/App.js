import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModeSelection from './Components/TicTacToe/GameModeSelection';
import IconSelection from './Components/TicTacToe/IconSelection';
import TicTacToe from './Components/TicTacToe/TicTacToe';

const App = () => {
    const [playerIcon1, setPlayerIcon1] = useState(null); // State for Player 1 icon
    const [playerIcon2, setPlayerIcon2] = useState(null); // State for Player 2 icon
    const [mode, setMode] = useState(null); // State for game mode ('1player' or '2player')

    return (
        <Router>
            <Routes>
                {/* Game mode selection */}
                <Route 
                    path="/" 
                    element={<GameModeSelection setMode={setMode} />} 
                />
                
                {/* Icon selection for both players */}
                <Route 
                    path="/icon-selection" 
                    element={
                        <IconSelection 
                            setPlayerIcon1={setPlayerIcon1} 
                            setPlayerIcon2={setPlayerIcon2} 
                            mode={mode} // Pass the mode to determine 1-player or 2-player behavior
                        />
                    } 
                />

                {/* Tic Tac Toe game, passing player icons */}
                <Route 
                    path="/game" 
                    element={<TicTacToe playerIcon1={playerIcon1} playerIcon2={playerIcon2} mode={mode} />} 
                />
            </Routes>
        </Router>
    );
};

export default App;