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

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie invalide.");
    }
  }, [partyId]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative p-6 rounded-lg shadow-md w-[90%] max-w-[380px] text-center"
        style={{
          backgroundImage: `url('/img/startgame/background_card.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '420px',
          borderRadius: '25px',
        }}
      >
        <img
          src="/img/homepage/tete_de_mort.png"
          alt="Icone"
          className="mx-auto mb-4"
          style={{ width: 'auto', height: 'auto' }}
        />
        <p className="text-xl font-bold text-[#00253E] mb-2">Joueur {currentPlayerIndex + 1}</p>
        <p className="text-md text-[#00253E] mb-6">Un rôle va t’être attribué</p>
        <input
          type="text"
          value={playerName}
          onChange={handleNameChange}
          placeholder="insérer un nom"
          maxLength={15}
          className="w-full px-4 py-2 border border-[#DED0B1] rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DED0B1]"
          disabled={loading}
        />
        <p className="text-right text-[#00253E] mt-2">{playerName.length}/15</p>
        {isNameTaken && <p className="text-sm text-red-500 mt-1">Ce nom est déjà pris.</p>}
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        <button
          className="w-20 bg-[#353535] text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!playerName.trim() || isNameTaken || loading}
        >
          0K
        </button>
      </div>
    </div>
  );
};

export default PlayerChoseName;