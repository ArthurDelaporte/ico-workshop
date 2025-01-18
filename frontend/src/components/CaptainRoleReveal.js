import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {getActualCaptainInfo, updatePartyStatus} from "../database/party";

const CaptainRoleReveal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    if (!partyId) {
      setError("Aucun ID de partie fourni.");
      setLoading(false);
      return;
    }

    setLoading(true);

    getActualCaptainInfo(partyId)
      .then(async (captainData) => {
        if (!captainData) {
          throw new Error("Aucun capitaine trouvé. Veuillez vérifier la configuration des joueurs.");
        }

        setCaptain(captainData);
        setImg(`/img/card/${captainData.card.img}.png`);
          await updatePartyStatus(partyId, "ilePoisonChoices");
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du capitaine :", err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      })
      .finally(() => setLoading(false));
  }, [partyId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        <p className="text-xl font-bold text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

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
      <p className="text-3xl font-bold text-white">{captain.name} (Capitaine)</p>
      <p className="text-lg text-white mt-2 mb-2">Ton rôle est</p>

      {/* Conteneur principal */}
      <div
        className="relative p-6 rounded-lg shadow-md w-[90%] max-w-[380px] text-center bg-[#DED0B1]"
      >

        {/* Informations du capitaine */}
        <p className="text-5xl font-bold text-[#00253E] uppercase">{captain.card.name}</p>

      </div>

      {/* Bouton OK */}
      <button
          className="w-20 text-2xl bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
          onClick={() => navigate(`/crew-selection?partyId=${partyId}`)}
      >
        OK
      </button>
    </div>
  );
};

export default CaptainRoleReveal;
