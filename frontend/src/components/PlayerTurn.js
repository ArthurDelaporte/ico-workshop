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
    navigate(`/player-card-choice?partyId=${partyId}`);
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