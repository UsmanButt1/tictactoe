import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToe.css';
import twoplayerGif from '../Assets/twoplayer.gif';

const GameModeSelection = ({ setMode }) => {
    const navigate = useNavigate();

    const handleModeSelection = (mode) => {
        setMode(mode); // Save the selected mode
        navigate('/icon-selection'); // Redirect to icon selection
    };

    return (
        <div>
            <h1 className="title"><span>Harry Potter's</span> Tic Tac Toe</h1>
            <h2>Select Game Mode</h2>

            <div className="playerbuttons">
                <button className="btns" onClick={() => handleModeSelection("1player")}>1 Player</button>
                <button className="btns" onClick={() => handleModeSelection("2player")}>2 Player</button>
            </div>
            <div>
                <h3 className="example">Example Gameplay:</h3>
            </div>
            <div className="gif-container">
                <img src={twoplayerGif} alt="Two player game-play" className="gameplay-gif" />
            </div>           
        </div>
    );
};

export default GameModeSelection;