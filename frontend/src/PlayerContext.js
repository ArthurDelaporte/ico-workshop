import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const initializePlayers = (numberOfPlayers) => {
    const roles = [];
    const marinsCount = Math.max(5, numberOfPlayers - 5); 
    const piratesCount = 4; 
    const sirenesCount = 1; 
  
    for (let i = 0; i < marinsCount; i++) roles.push('Marin');
    for (let i = 0; i < piratesCount; i++) roles.push('Pirate');
    for (let i = 0; i < sirenesCount; i++) roles.push('Sirène');
  
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
  
    const newPlayers = Array.from({ length: numberOfPlayers }, (_, index) => ({
      name: '',
      role: index === 0 ? 'Capitaine' : 'Membre d\'équipage',
      mainRole: shuffledRoles[index] || '', 
      bonusCard: '',
    }));
  
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
  };
  

  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => prev + 1);
  };

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, currentPlayerIndex, nextPlayer, initializePlayers }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
