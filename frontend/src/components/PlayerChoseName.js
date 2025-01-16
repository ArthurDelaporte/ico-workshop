import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerChoseName = () => {
  const { players, currentPlayerIndex, setPlayers } = usePlayerContext();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (playerName.trim()) {
      setError('');
      // Mettre à jour le nom du joueur actuel
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].name = playerName;
      setPlayers(updatedPlayers);

      navigate('/player-role-reveal'); // Redirection vers le rôle
    } else {
      setError('Veuillez entrer un nom.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">Joueur {currentPlayerIndex + 1}</h1>
        <div className="mb-4">
          <label htmlFor="playerName" className="text-lg font-bold text-gray-800 block mb-2">
            Entrez votre nom :
          </label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleSubmit}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PlayerChoseName;
