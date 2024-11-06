import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import basilisk_gif from '../Assets/basilisk.gif';
import buckbeak_gif from '../Assets/buckbeak.gif';
import dobby_gif from '../Assets/dobby.gif';
import fawkes_gif from '../Assets/fawkes.gif';
import thestral_gif from '../Assets/thestral.gif';
import werewolf_gif from '../Assets/werewolf.gif';

const gifs = [
    { src: basilisk_gif, name: "Basilisk" },
    { src: buckbeak_gif, name: "Buckbeak" },
    { src: dobby_gif, name: "Dobby" },
    { src: fawkes_gif, name: "Fawkes" },
    { src: thestral_gif, name: "Thestral" },
    { src: werewolf_gif, name: "Werewolf" },
];

const IconSelection = ({ setPlayerIcon1, setPlayerIcon2, mode }) => {
    const navigate = useNavigate();
    const [selectedIcons, setSelectedIcons] = useState({
        player1: null,
        player2: null,
    });

    const selectIcon = (icon) => {
        if (mode === "2player") {
            if (!selectedIcons.player1) {
                setPlayerIcon1(icon.src);
                setSelectedIcons({ ...selectedIcons, player1: icon.name });
            } else if (!selectedIcons.player2) {
                if (icon.name !== selectedIcons.player1) {
                    setPlayerIcon2(icon.src);
                    setSelectedIcons({ ...selectedIcons, player2: icon.name });
                    navigate('/game');
                }
            }
        } else if (mode === "1player") {
            if (!selectedIcons.player1) {
                setPlayerIcon1(icon.src);
                setSelectedIcons({ ...selectedIcons, player1: icon.name });

                const computerIcon = getRandomIcon(icon.src);
                setPlayerIcon2(computerIcon);
                setSelectedIcons({ ...selectedIcons, player2: getIconName(computerIcon) });
                navigate('/game');
            }
        }
    };

    const getRandomIcon = (selectedIcon) => {
        const availableIcons = gifs.filter(gif => gif.src !== selectedIcon);
        const randomIndex = Math.floor(Math.random() * availableIcons.length);
        return availableIcons[randomIndex].src;
    };

    const getIconName = (src) => {
        const selectedGif = gifs.find(gif => gif.src === src);
        return selectedGif ? selectedGif.name : "Unknown";
    };

    return (
        <div className="icon-selection">
            <h2>{!selectedIcons.player1 ? "Player 1: Select Your Icon" : "Player 2: Select Your Icon"}</h2>
            <div className="gif-grid">
                {gifs.map((gif, index) => (
                    <div
                        key={index}
                        className={`gif-box ${selectedIcons.player1 === gif.name || selectedIcons.player2 === gif.name ? 'disabled' : ''}`}
                        onClick={() => {
                            if (selectedIcons.player1 === gif.name) return;
                            selectIcon(gif);
                        }}
                    >
                        <img src={gif.src} alt={gif.name} className="gif-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconSelection;