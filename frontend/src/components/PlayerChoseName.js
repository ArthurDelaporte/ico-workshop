import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

import { setPlayerName, isPlayerNameUsed } from '../database/player';

const PlayerChoseName = () => {
  const { players, currentPlayerIndex, setPlayers } = usePlayerContext();
  const [playerName, setPlayerNameState] = useState('');
  const [error, setError] = useState('');
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  // Vérifie si le partyId est valide
  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie invalide.");
    }
  }, [partyId]);

  // Vérifie si le nom est déjà utilisé
  useEffect(() => {
    let isMounted = true;

    if (partyId && playerName.trim()) {
      isPlayerNameUsed(partyId, playerName).then((taken) => {
        if (isMounted) setIsNameTaken(taken);
      });
    } else {
      setIsNameTaken(false);
    }

    return () => {
      isMounted = false;
    };
  }, [playerName, partyId]);

  const handleNameChange = (e) => {
    setPlayerNameState(e.target.value);
    setError('');
  };

  const handleSubmit = useCallback(async () => {
    if (!playerName.trim()) {
      setError('Veuillez entrer un nom.');
      return;
    }
    if (!partyId) {
      setError("Impossible d'enregistrer le nom sans ID de partie.");
      return;
    }

    setLoading(true);

    try {
      const updatedPlayer = await setPlayerName(partyId, playerName);

      // Mise à jour localement l'état des joueurs
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex] = updatedPlayer;
      setPlayers(updatedPlayers);

      navigate(`/player-role-reveal?partyId=${partyId}&playerId=${updatedPlayer.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [playerName, partyId, players, currentPlayerIndex, setPlayers, navigate]);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-xl font-bold text-gray-800">Joueur {currentPlayerIndex + 1}</p>
          <div className="mb-4">
            <label htmlFor="playerName" className="text-lg font-bold text-gray-800 block mb-2">
              Entrez votre nom :
            </label>
            <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                disabled={loading}
            />
            {isNameTaken && <p className="text-sm text-red-500 mt-1">Ce nom est déjà pris.</p>}
          </div>
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
          <button
              className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300 disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={!playerName.trim() || isNameTaken || loading}
          >
            {loading ? 'Chargement...' : 'OK'}
          </button>
        </div>
      </div>
  );
};

export default PlayerChoseName;