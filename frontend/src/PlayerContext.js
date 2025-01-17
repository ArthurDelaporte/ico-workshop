import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [scores, setScores] = useState({ marins: 0, pirates: 0 });

  /**
   * Initialiser les joueurs avec leurs rôles
   */
  const initializePlayers = (numberOfPlayers) => {
    const roles = [];
    const marinsCount = Math.floor(numberOfPlayers / 2);
    const piratesCount = numberOfPlayers - marinsCount - 1;
    const sirenesCount = 1;
  
    for (let i = 0; i < marinsCount; i++) roles.push('Marin');
    for (let i = 0; i < piratesCount; i++) roles.push('Pirate');
    for (let i = 0; i < sirenesCount; i++) roles.push('Sirène');
  
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
  
    const newPlayers = Array.from({ length: numberOfPlayers }, (_, index) => ({
      id: `player-${index + 1}`,
      name: `Joueur ${index + 1}`,
      role: index === 0 ? 'Capitaine' : 'Membre d\'équipage',
      mainRole: shuffledRoles[index] || '', 
      bonusCard: '',
    }));
  
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setSelectedCrew([]);
    setScores({ marins: 0, pirates: 0 });
  };

  /**
   * Passer au joueur suivant
   */
  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => {
      if (prevIndex + 1 < players.length) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };
  

  /**
   * Sélectionner l'équipage pour une manche
   */
  const selectCrew = (crew) => {
    setSelectedCrew(crew);
    setCurrentPlayerIndex(0);
  };

  /**
   * Mettre à jour les scores en fonction des choix
   */
  const updateScores = (poisonCount) => {
    setScores((prevScores) => {
      if (poisonCount > 0) {
        return { ...prevScores, pirates: prevScores.pirates + 1 };
      } else {
        return { ...prevScores, marins: prevScores.marins + 1 };
      }
    });
  };

  /**
   * Réinitialiser le contexte pour une nouvelle manche
   */
  const resetForNextRound = () => {
    setSelectedCrew([]);
    setCurrentPlayerIndex(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        setPlayers,
        currentPlayerIndex,
        nextPlayer,
        selectedCrew,
        selectCrew,
        scores,
        updateScores,
        initializePlayers,
        resetForNextRound,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
