import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

import { initializeParty } from '../database/party';

const MIN_PLAYERS = 7;
const MAX_PLAYERS = 20;

const GameSetup = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(10); // Par défaut 10 joueurs
  const [marinsCount, setMarinsCount] = useState(5);
  const [piratesCount, setPiratesCount] = useState(4);
  const { initializePlayers } = usePlayerContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const marins = Math.floor(numberOfPlayers / 2);
    const pirates = numberOfPlayers - marins - 1;
    setMarinsCount(marins);
    setPiratesCount(pirates);
  }, [numberOfPlayers]);

  const updatePlayerCount = useCallback((increment) => {
    setNumberOfPlayers((prev) => Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, prev + increment)));
  }, []);

  const handleStartGame = useCallback(async () => {
    setLoading(true);
    try {
      await initializePlayers(numberOfPlayers);
      const party = await initializeParty(numberOfPlayers);
      console.log('Party created:', party);
      navigate(`/player-chose-name?partyId=${party.id}`); // ✅ Utilisation correcte du paramètre d'URL
    } catch (error) {
      console.error('Erreur lors de l’initialisation de la partie :', error);
    } finally {
      setLoading(false);
    }
  }, [initializePlayers, numberOfPlayers, navigate]);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-xl font-bold text-gray-800 mb-4">Joueurs :</p>

          <div className="flex items-center justify-center mb-6">
            <button
                className="w-10 h-10 bg-red-500 text-white rounded-full focus:outline-none disabled:opacity-50"
                onClick={() => updatePlayerCount(-1)}
                disabled={numberOfPlayers <= MIN_PLAYERS || loading}
            >
              -
            </button>
            <span className="mx-4 text-2xl font-bold">{numberOfPlayers}</span>
            <button
                className="w-10 h-10 bg-green-500 text-white rounded-full focus:outline-none disabled:opacity-50"
                onClick={() => updatePlayerCount(1)}
                disabled={numberOfPlayers >= MAX_PLAYERS || loading}
            >
              +
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
            <p className="text-sm text-teal-700">Marins : {marinsCount}</p>
            <p className="text-sm text-teal-700">Pirates : {piratesCount}</p>
            <p className="text-sm text-teal-700">Sirène : 1</p>
          </div>

          <button
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 mb-4 disabled:bg-gray-400"
              onClick={handleStartGame}
              disabled={loading}
          >
            {loading ? 'Chargement...' : 'Commencer'}
          </button>
          <button
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => navigate('/')}
              disabled={loading}
          >
            Retour
          </button>
        </div>
      </div>
  );
};

export default GameSetup;
