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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div className="flex flex-col items-center text-center">
        {/* Image Tête de Mort */}
        <img
          src="/img/startgame/tete_de_mort_blanche.png"
          alt="Icone Tête de Mort"
          className="mb-6"
          style={{ width: 'auto', height: 'auto' }}
        />
        <p className="text-lg font-bold text-white uppercase mb-2">Joueurs</p>

        {/* Nombre de joueurs avec les boutons */}
        <div className="flex items-center justify-center mb-6">
          <button
            className="w-10 h-10 bg-[#981B20] text-white text-xl rounded-full focus:outline-none disabled:opacity-50"
            onClick={() => updatePlayerCount(-1)}
            disabled={numberOfPlayers <= MIN_PLAYERS || loading}
          >
            -
          </button>
          <span className="mx-6 text-3xl font-bold text-[#DED0B1]">{numberOfPlayers}</span>
          <button
            className="w-10 h-10 bg-[#00253E] text-white text-xl rounded-full border-2 border-[#DED0B1] focus:outline-none disabled:opacity-50"
            onClick={() => updatePlayerCount(1)}
            disabled={numberOfPlayers >=
              MAX_PLAYERS || loading}
              >
                +
              </button>
            </div>
    
            {/* Détails des rôles */}
            <div
              className="bg-[#DED0B1] rounded-lg shadow-inner p-4 mb-6 text-center"
              style={{ width: '200px' }}
            >
              <p className="text-sm text-[#00253E] font-semibold">Marins : {marinsCount}</p>
              <p className="text-sm text-[#00253E] font-semibold">Pirates : {piratesCount}</p>
              <p className="text-sm text-[#00253E] font-semibold">Sirène : 1</p>
            </div>
    
            {/* Bouton Commencer */}
            <button
              className="w-full bg-black text-white text-lg font-bold py-3 rounded-lg mb-6 hover:bg-gray-800 transition duration-300"
              onClick={handleStartGame}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'COMMENCER'}
            </button>
    
            {/* Bouton Retour */}
            <button
              onClick={() => navigate("/")}
              className="bg-[#981B20] text-white w-12 h-12 rounded-full flex items-center justify-center mt-8 hover:bg-red-800 transition duration-300"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            </button>
          </div>
        </div>
      );
    };
    
    export default GameSetup;
    