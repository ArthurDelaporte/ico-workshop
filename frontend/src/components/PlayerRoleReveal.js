import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';
import { getPlayerInfo, hasUnnamedPlayers } from "../database/player";
import { getPartyInfo } from "../database/party";

const PlayerRoleReveal = () => {
  const { nextPlayer } = usePlayerContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const partyId = searchParams.get('partyId');
  const playerId = searchParams.get('playerId');

  const [player, setPlayer] = useState(null);
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false); // Empêcher les clics multiples
  const [img, setImg] = useState('');

  useEffect(() => {
    if (!partyId || !playerId) {
      setError("ID de la partie ou du joueur manquant.");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Charger les données du joueur et de la partie en parallèle
    Promise.all([getPlayerInfo(playerId), getPartyInfo(partyId)])
        .then(([playerData, partyData]) => {
          if (!playerData) {
            setError("Impossible de récupérer les informations du joueur.");
          } else {
            setPlayer(playerData);
            setParty(partyData);
            setImg(`/img/card/${playerData.card.img}.png`);
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des données :", err);
          setError("Erreur lors de la récupération des données.");
        })
        .finally(() => setLoading(false));
  }, [partyId, playerId]);

  const handleNext = async () => {
    if (isChecking) return; // Empêche plusieurs clics
    setIsChecking(true);

    try {
      if (party?.status === "initial") {
        const hasPlayersUnnamed = await hasUnnamedPlayers(partyId);

        if (hasPlayersUnnamed) {
          nextPlayer();
          navigate(`/player-chose-name?partyId=${partyId}`);
        } else {
          navigate(`/new-captain-reveal?partyId=${partyId}`);
        }
      } else {
        navigate(`/player-card-choice?partyId=${partyId}`)
      }
    } catch (err) {
      console.error("Erreur lors de la vérification des joueurs sans nom :", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsChecking(false);
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
          <p className="text-xl font-bold text-gray-700">Chargement...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
          <p className="text-xl font-bold text-red-500">{error}</p>
        </div>
    );
  }

  const isCaptain = party?.actual_captain === player?.id;

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        {/* Icône joueur */}
        <img
            src={img}
            alt="Icone joueur"
            className="mx-auto mb-4"
            style={{ width: '150px', height: '150px', borderRadius: '10px' }}
        />
        {/* Informations du capitaine */}
        <p className="text-3xl font-bold text-white">{player.name} {isCaptain ? "(Capitaine)" : ""}</p>
        <p className="text-lg text-white mt-2 mb-2">Ton rôle est</p>

        {/* Conteneur principal */}
        <div
            className="relative p-6 rounded-lg w-[90%] max-w-[380px] text-center bg-[#DED0B1]"
        >

          {/* Informations du capitaine */}
          <p className="text-5xl font-bold text-[#00253E] uppercase">{player.card.name}</p>

        </div>

        {/* Bouton conditionnel selon le statut de la partie */}
        {party?.status === "initial" ? (
            <button
                className="w-20 text-2xl bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
                onClick={handleNext}
                disabled={isChecking}
            >
              {isChecking ? 'Vérification...' : 'OK'}
            </button>
        ) : (
            <button
                className="w-48 text-2xl bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
                onClick={handleNext}
                disabled={isChecking}
            >
              {isChecking ? 'Vérification...' : 'CHOISIS UNE CARTE'}
            </button>
        )}
      </div>
  );
};

export default PlayerRoleReveal;