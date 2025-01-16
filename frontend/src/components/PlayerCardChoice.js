import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerCardChoice = () => {
  const { players, currentPlayerIndex, nextPlayer } = usePlayerContext();
  const navigate = useNavigate();

  if (!players || players.length === 0 || currentPlayerIndex >= players.length) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const currentPlayer = players[currentPlayerIndex];

  const handleCardChoice = () => {
    console.log(`Le joueur ${currentPlayer.name} a choisi une carte.`);
    nextPlayer();
    navigate('/action-card-selection');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <div className="text-4xl text-gray-600 mb-4">
          <i className="fas fa-user"></i>
        </div>
        <h1 className="text-xl font-bold text-gray-800">{currentPlayer.name}</h1>
        <p className="text-lg font-semibold text-teal-700 mt-4">Ton rôle est</p>
        <p className="text-2xl font-bold text-gray-800">{currentPlayer.role}</p>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleCardChoice}
        >
          CHOISIS UNE CARTE
        </button>
      </div>
    </div>
  );
};

export default PlayerCardChoice;

