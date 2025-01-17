import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getActualCaptainInfo } from "../database/party";

const CaptainRoleReveal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!partyId) {
      setError("Aucun ID de partie fourni.");
      setLoading(false);
      return;
    }

    setLoading(true);

    getActualCaptainInfo(partyId)
        .then((captainData) => {
          if (!captainData) {
            setError("Aucun capitaine trouvé. Veuillez vérifier la configuration des joueurs.");
          } else {
            setCaptain(captainData);
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du capitaine :", err);
          setError("Une erreur est survenue. Veuillez réessayer.");
        })
        .finally(() => setLoading(false));
  }, [partyId]);

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

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
        {/* Conteneur principal */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          {/* Icône joueur */}
          <div className="text-4xl text-gray-600 mb-4">
            <i className="fas fa-user"></i>
          </div>

          {/* Informations du capitaine */}
          <p className="text-xl font-bold text-gray-800">{captain.name} (Capitaine)</p>
          <p className="text-lg font-semibold text-teal-700 mt-4">Ton rôle est</p>
          <p className="text-2xl font-bold text-gray-800">{captain.card?.name || 'Aucun rôle assigné'}</p>

          {/* Bouton OK */}
          <button
              className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
              onClick={() => navigate(`/crew-selection?partyId=${partyId}`)} // Redirige vers les instructions ou la prochaine étape
          >
            OK
          </button>
        </div>
      </div>
  );
};

export default CaptainRoleReveal;