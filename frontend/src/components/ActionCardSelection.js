import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const ActionCardSelection = () => {
  const { players, setPlayers, currentPlayerIndex, nextPlayer } = usePlayerContext();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');

  
  const maxCrewSize = 3;
  const crewPlayers = players.slice(1, maxCrewSize + 1);
  const crewPlayerIndex = currentPlayerIndex - 1;
  const currentCrewPlayer = crewPlayers[crewPlayerIndex];


  if (!currentCrewPlayer) {
    console.error('Erreur : Joueur actuel de l\'équipage introuvable.');
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (!selectedCard) {
      alert('Veuillez sélectionner une carte.');
      return;
    }

    console.log(`Le joueur ${currentCrewPlayer.name} a choisi : ${selectedCard}`);

    const updatedPlayers = [...players];
    const globalIndex = players.findIndex((player) => player.name === currentCrewPlayer.name);
    updatedPlayers[globalIndex] = {
      ...currentCrewPlayer,
      selectedCard,
    };
    setPlayers(updatedPlayers);

    if (crewPlayerIndex + 1 < maxCrewSize) {
      nextPlayer();
      setSelectedCard('');
      navigate('/player-turn-notification');
    } else {
      console.log('Tous les joueurs de l\'équipage ont choisi leurs cartes.');
      navigate('/captain-reveal-cards'); // Terminez et passez au capitaine
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="w-full max-w-md">
        <div className="text-center bg-black py-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-red-500">
            JOUEUR {crewPlayerIndex + 1} / {maxCrewSize}
          </h1>
          <p className="text-lg mt-2 text-white">Nom : {currentCrewPlayer.name}</p>
          <p className="text-sm mt-2">Carte sélectionnée : {selectedCard || 'Aucune'}</p>
        </div>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 gap-4 max-w-md w-full">
        <button
          className={`p-6 rounded-lg shadow-md text-black bg-white text-xl font-bold ${
            selectedCard === 'ILE' ? 'ring-4 ring-teal-500' : ''
          }`}
          onClick={() => handleCardClick('ILE')}
        >
          ILE
        </button>
        <button
          className={`p-6 rounded-lg shadow-md text-black bg-white text-xl font-bold ${
            selectedCard === 'POISON' ? 'ring-4 ring-teal-500' : ''
          }`}
          onClick={() => handleCardClick('POISON')}
        >
          POISON
        </button>
      </div>

      <button
        className="w-full max-w-md bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
        onClick={handleConfirmSelection}
      >
        CONFIRMER
      </button>
    </div>
  );
};

export default ActionCardSelection;
