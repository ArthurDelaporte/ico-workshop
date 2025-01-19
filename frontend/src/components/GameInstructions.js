import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

const GameStartInstructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const handleStartGame = async () => {
    navigate(`/captain-role-reveal?partyId=${partyId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Conteneur principal */}
      <div
        className="relative p-6 rounded-lg w-[90%] max-w-[380px] text-center"
        style={{
          backgroundImage: `url('/img/startgame/background_card.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '420px',
          borderRadius: '25px',
        }}
      >
        {/* Titre */}
        <p className="text-lg font-bold text-[#00253E] mb-4">
          Tout le monde ferme les yeux et baisse la tête !
        </p>

        {/* Liste des étapes */}
        <ul className="text-sm text-[#00253E] text-left mb-6">
          <li className="mb-2">
            1. Le capitaine va appeler les pirates et la sirène à ouvrir les yeux (le capitaine ouvre les yeux s’il a un de ces rôles) et leur laisse suffisamment de temps pour se regarder.
          </li>
          <li className="mb-2">2. Tout le monde ferme les yeux.</li>
          <li>
            3. Et pour finir, il va demander à tout le monde de réouvrir les yeux.
          </li>
        </ul>

        {/* Avertissement */}
        <p className="text-sm text-[#981B20] font-medium mb-6">
          Vous ne fermerez plus les yeux par la suite, retenez bien qui a ouvert les yeux.
        </p>

        {/* Bouton OK */}
        <button
          className="w-20 bg-[#00253E] text-white py-3 rounded-lg mt-4 hover:bg-gray-800 transition duration-300"
          onClick={handleStartGame}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GameStartInstructions;
