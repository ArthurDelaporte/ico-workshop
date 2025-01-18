import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPlayerInfo } from '../database/player';
import { getLastAventureInfo } from '../database/aventure';

const PlayerTurn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    setLoading(true);

    getLastAventureInfo(partyId)
        .then(async (aventure) => {
          if (!aventure || !aventure.team || aventure.team.length === 0) {
            throw new Error("Aucune équipe trouvée pour cette aventure.");
          }

          // Trouver le premier joueur dont le choix est `null`
          const nextPlayer = aventure.team.find((member) => member.choice === null);

          if (!nextPlayer) {
            throw new Error("Tous les joueurs de l'aventure ont déjà joué.");
          }

          return getPlayerInfo(nextPlayer.playerId);
        })
        .then((playerData) => {
          if (!playerData) {
            throw new Error("Impossible de récupérer les informations du joueur.");
          }
          setCurrentPlayer(playerData);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des données :", err);
          setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
        })
        .finally(() => setLoading(false));
  }, [partyId]);

  const handleNext = () => {
    if (!currentPlayer) return;
    navigate(`/player-role-reveal?partyId=${partyId}&playerId=${currentPlayer.id}`);
  };

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
          <p className="text-xl font-bold text-gray-700">Chargement...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
          <p className="text-xl font-bold text-red-500">{error}</p>
        </div>
    );
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
          <div
              className="relative p-6 shadow-md w-[90%] max-w-[380px] text-center"
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
                  style={{width: 'auto', height: 'auto'}}
              />
              <p className="text-3xl font-bold text-[#00253E]">{currentPlayer.name}</p>
              <p className="text-4xl font-bold text-[#981B20] mt-4">C'EST TON TOUR !</p>
              <p className="text-sm font-thin italic text-[#00253E] mt-2">Passez le téléphone au joueur</p>
              <button
                  className="w-20 bg-[#00253E] text-white py-3 rounded-lg mt-28 hover:bg-gray-800 transition duration-300"
                  onClick={handleNext}
              >
                  OK
              </button>
          </div>
      </div>
  );
};

export default PlayerTurn;