import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerTurn = () => {
  const { players, currentPlayerIndex, nextPlayer } = usePlayerContext();
  const navigate = useNavigate();

  const currentPlayer = players[currentPlayerIndex];

  const handleNext = () => {
    console.log(`Current Player Index: ${currentPlayerIndex}`);
    if (currentPlayerIndex + 1 < players.length) {
      nextPlayer();
      console.log('Navigating to the next player');
      navigate('/player-turn');
    } else {
      console.log('All players have played, navigating to the next phase');
      navigate('/player-card-choice');
    }
  };

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <div className="text-4xl text-gray-600 mb-4">
          <i className="fas fa-user"></i>
        </div>
        <h1 className="text-xl font-bold text-gray-800">{currentPlayer.name}</h1>
        <p className="text-2xl font-bold text-red-600 mt-4">C’EST TON TOUR !</p>
        <p className="text-sm text-gray-600 mt-2">Passez le téléphone au joueur</p>
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

export default PlayerTurn;
