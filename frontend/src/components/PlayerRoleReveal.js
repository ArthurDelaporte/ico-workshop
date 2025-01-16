import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerRoleReveal = () => {
  const { players, currentPlayerIndex, nextPlayer } = usePlayerContext();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPlayerIndex + 1 < players.length) {
      nextPlayer(); // Passer au joueur suivant
      navigate('/player-chose-name'); // Retour au choix du nom pour le joueur suivant
    } else {
      navigate('/game-instructions'); // Redirection finale après tous les joueurs
    }
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">
          {currentPlayer.name} ({currentPlayer.role})
        </h1>
        <p className="text-lg font-semibold text-teal-700 mt-4">Ton rôle est</p>
        <p className="text-2xl font-bold text-gray-800">
          {currentPlayer.mainRole || 'Aucun rôle assigné'}
        </p>
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

export default PlayerRoleReveal;
