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
  const [img, setImg] = useState('');

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
          throw new Error("Aucun capitaine trouvé. Veuillez vérifier la configuration des joueurs.");
        }

        // Fix : Assurez-vous que captainData.card est bien défini
        captainData.card = captainData.card || { img: 'default_card', name: 'MARIN', bonus: 'MEDUSA' };

        setCaptain(captainData);
        setImg(`/img/card/${captainData.card.img}.png`);
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
      {/* Conteneur principal */}
      <div
        className="relative p-6 rounded-lg shadow-md w-[90%] max-w-[380px] text-center"
        style={{
          backgroundImage: `url('/img/startgame/background_card.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '480px',
        }}
      >
        {/* Icône joueur */}
        <img
          src={img}
          alt="Icone joueur"
          className="mx-auto mb-4"
          style={{ width: '50px', height: '50px' }}
        />

        {/* Informations du capitaine */}
        <p className="text-lg font-bold text-[#00253E]">{captain.name} (Capitaine)</p>
        <p className="text-md text-[#00253E] mt-2">Ton rôle est</p>
        <p className="text-2xl font-bold text-[#00253E] uppercase">{captain.card.name}</p>

        {/* Détails de la carte bonus */}
        <div className="mt-4">
          <p className="text-sm text-[#00253E]">Ta carte bonus est : <strong>{captain.card.bonus}</strong></p>
          <p className="text-xs text-[#00253E] italic">Tu pourras à nouveau la consulter sur ton profil</p>
          <p className="text-sm text-[#00253E] font-bold mt-2">Découvre ton bonus</p>
          <p className="text-2xl text-[#00253E] font-bold">+</p>
        </div>

        {/* Bouton OK */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
          onClick={() => navigate(`/crew-selection?partyId=${partyId}`)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CaptainRoleReveal;
