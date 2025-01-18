import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';
import { getPartyInfo } from '../database/party';

const PlayerTurnNotification = () => {
  const { players, currentPlayerIndex } = usePlayerContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPlayer = players?.[currentPlayerIndex];
  const [partyScores, setPartyScores] = useState({ marins: 0, pirates: 0 });

  useEffect(() => {
    const fetchPartyScores = async () => {
      try {
        const partyId = searchParams.get('partyId');
        const partyInfo = await getPartyInfo(partyId);
        if (partyInfo) {
          setPartyScores({
            marins: partyInfo.score_marins,
            pirates: partyInfo.score_pirates,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des scores de la partie :', error);
      }
    };

    fetchPartyScores();
  }, []);

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const handleNext = () => {
    console.log(`Le joueur ${currentPlayer.name} passe à la sélection de carte.`);

    if (currentPlayerIndex === 0) {
      navigate('/action-card-selection');
    } else {
      navigate('/crew-selection', { state: { partyScores } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentPlayer.name}</h1>
        <p className="text-lg text-red-500 font-bold">C'EST TON TOUR !</p>
        <p className="text-sm text-gray-700 mt-2">Passe le téléphone au joueur.</p>
        <div className="text-left mt-4">
          <p className="text-sm text-gray-700">
            <strong>Score des Marins :</strong> {partyScores.marins}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Score des Pirates :</strong> {partyScores.pirates}
          </p>
        </div>
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

export default PlayerTurnNotification;
