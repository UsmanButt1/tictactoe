import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Correct imports
import GameModeSelection from './Components/TicTacToe/GameModeSelection';
import IconSelection from './Components/TicTacToe/IconSelection';
import TicTacToe from './Components/TicTacToe/TicTacToe';

const App = () => {
    const [playerIcon1, setPlayerIcon1] = useState(null); // State for Player 1 icon
    const [playerIcon2, setPlayerIcon2] = useState(null); // State for Player 2 icon
    const [mode, setMode] = useState(null); // State for game mode ('1player' or '2player')

    return (
        <Routes> 
            {/* Home page route, displays GameModeSelection */}
            <Route path="/tictactoe" element={<GameModeSelection setMode={setMode} />} />

            {/* Icon selection route */}
            <Route 
                path="/icon-selection" 
                element={<IconSelection 
                            setPlayerIcon1={setPlayerIcon1} 
                            setPlayerIcon2={setPlayerIcon2} 
                            mode={mode} 
                        />} 
            />

            {/* TicTacToe game route */}
            <Route 
                path="/game" 
                element={<TicTacToe 
                            playerIcon1={playerIcon1} 
                            playerIcon2={playerIcon2} 
                            mode={mode} 
                        />} 
            />
        </Routes>
    );
};

export default App;