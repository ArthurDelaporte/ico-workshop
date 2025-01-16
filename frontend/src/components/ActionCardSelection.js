import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const ActionCardSelection = () => {
  const { players, currentPlayerIndex } = usePlayerContext();
  const currentPlayer = players[currentPlayerIndex];
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (selectedCard) {
      console.log(`Le joueur ${currentPlayer.name} a choisi : ${selectedCard}`);
      navigate('/player-turn'); // Redirige vers le prochain joueur ou étape
    } else {
      alert('Veuillez sélectionner une carte.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      {/* Titre */}
      <div className="w-full max-w-md">
        <div className="text-center bg-black py-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-red-500">CHOISIS TA CARTE</h1>
          <p className="text-sm mt-2">
            Les Marins ne peuvent prendre que des cartes îles contrairement aux Pirates qui ont le choix entre les deux
          </p>
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

      {/* Bouton de confirmation */}
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
