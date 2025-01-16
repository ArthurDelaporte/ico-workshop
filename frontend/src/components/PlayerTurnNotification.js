import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerTurnNotification = () => {
  const { players, currentPlayerIndex } = usePlayerContext();
  const navigate = useNavigate();

  const currentPlayer = players?.[currentPlayerIndex];

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const handleNext = () => {
    console.log(`Le joueur ${currentPlayer.name} passe à la sélection de carte.`);
    navigate('/action-card-selection'); // Redirige vers la sélection de carte
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentPlayer.name}</h1>
        <p className="text-lg text-red-500 font-bold">C'EST TON TOUR !</p>
        <p className="text-sm text-gray-700 mt-2">Passe le téléphone au joueur.</p>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PlayerTurnNotification;
