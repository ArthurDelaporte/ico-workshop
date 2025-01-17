import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const ActionCardSelection = () => {
  const { players, currentPlayerIndex, nextPlayer } = usePlayerContext();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');

  useEffect(() => {
    console.log('Players:', players);
    console.log('Current Player Index:', currentPlayerIndex);
    console.log('Current Player:', players[currentPlayerIndex]);
  }, [players, currentPlayerIndex]);

  if (!players || players.length === 0) {
    console.error('Erreur : Liste des joueurs vide.');
    return <p className="text-red-500">Erreur : Liste des joueurs vide.</p>;
  }

  const currentPlayer = players[currentPlayerIndex];
  if (!currentPlayer) {
    console.error('Erreur : Joueur actuel introuvable.');
    return <p className="text-red-500">Erreur : Joueur actuel introuvable.</p>;
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (!selectedCard) {
      alert('Veuillez sélectionner une carte.');
      return;
    }

    console.log(`Le joueur ${currentPlayer.name} a choisi : ${selectedCard}`);

    nextPlayer();

    if (currentPlayerIndex + 1 < players.length) {
      navigate('/player-turn-notification');
    } else {
      navigate('/captain-reveal-cards');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="w-full max-w-md">
        <div className="text-center bg-black py-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-red-500">
            JOUEUR {currentPlayerIndex + 1} / {players.length}
          </h1>
          <p className="text-lg mt-2 text-white">Nom : {currentPlayer.name}</p>
          <p className="text-sm mt-2">Carte sélectionnée : {selectedCard || 'Aucune'}</p>
        </div>
      </div>
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
