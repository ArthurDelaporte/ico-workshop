import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

const GameStartInstructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const partyId = searchParams.get('partyId');

  const handleStartGame = () => {
    navigate(`/captain-role-reveal?partyId=${partyId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 px-6 py-8">
      {/* Conteneur principal */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <p className="text-xl font-bold text-gray-800 mb-4">
          Tout le monde ferme les yeux et baisse la tête !
        </p>
        <ul className="text-sm text-gray-700 text-left mb-6">
          <li className="mb-2">
            1. Le capitaine va appeler les pirates et la sirène à ouvrir les yeux (le capitaine ouvre les yeux s’il a un de ces rôles) et leur laisse suffisamment de temps pour se regarder.
          </li>
          <li className="mb-2">2. Tout le monde ferme les yeux.</li>
          <li>
            3. Et pour finir, il va demander à tout le monde de réouvrir les yeux.
          </li>
        </ul>
        <p className="text-sm text-red-500 font-medium mb-6">
          Vous ne fermerez plus les yeux par la suite, retenez bien qui a ouvert les yeux.
        </p>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          onClick={handleStartGame}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GameStartInstructions;
