import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const CaptainRoleReveal = () => {
  const { players } = usePlayerContext();
  const navigate = useNavigate();

  // Récupérer les informations du capitaine
  const captain = players.find((player) => player.role === 'Capitaine');

  if (!captain) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
        <p className="text-xl font-bold text-red-500">
          Aucun capitaine trouvé. Veuillez vérifier la configuration des joueurs.
        </p>
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
        <h1 className="text-xl font-bold text-gray-800">{captain.name} (Capitaine)</h1>
        <p className="text-lg font-semibold text-teal-700 mt-4">Ton rôle est</p>
        <p className="text-2xl font-bold text-gray-800">{captain.mainRole}</p>

        {/* Bouton OK */}
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={() => navigate('/crew-selection')} // Redirige vers les instructions ou la prochaine étape
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CaptainRoleReveal;
