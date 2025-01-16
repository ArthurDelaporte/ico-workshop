import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const GameSetup = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(10); // Par défaut 10 joueurs
  const { initializePlayers } = usePlayerContext();
  const navigate = useNavigate();

  const handleStartGame = () => {
    initializePlayers(numberOfPlayers); // Initialiser les joueurs
    navigate('/player-chose-name'); // Rediriger vers l'entrée des noms
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Joueurs :</h1>
        <div className="flex items-center justify-center mb-6">
          <button
            className="w-10 h-10 bg-red-500 text-white rounded-full focus:outline-none"
            onClick={() => setNumberOfPlayers((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="mx-4 text-2xl font-bold">{numberOfPlayers}</span>
          <button
            className="w-10 h-10 bg-green-500 text-white rounded-full focus:outline-none"
            onClick={() => setNumberOfPlayers((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-sm text-teal-700">5 Marins : {Math.max(5, numberOfPlayers - 5)}</p>
          <p className="text-sm text-teal-700">4 Pirates : 4</p>
          <p className="text-sm text-teal-700">1 Sirène : 1</p>
        </div>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 mb-4"
          onClick={handleStartGame}
        >
          Commencer
        </button>
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => navigate('/')}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
