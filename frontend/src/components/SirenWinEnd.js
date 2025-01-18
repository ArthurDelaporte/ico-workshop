import React from 'react';
import { useNavigate } from 'react-router-dom';

const SirenWinEnd = ({ players }) => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/game-setup');
  };

  const handleMenu = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative text-black rounded-lg shadow-md w-full max-w-md p-6"
        style={{
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-lg font-bold text-[#981B20] text-center mb-4">
          LA SIRÈNE REMPORTENT LA PARTIE SEULE !
        </h1>
        <p className="text-sm text-center leading-relaxed text-black mb-6">
          En déjouant les plans des pirates et des marins, la sirène a su garder son identité
          secrète et remporte la partie seule. Félicitations !
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {players?.length > 0 &&
            players.map((player, index) => (
              <div
                key={index}
                className="bg-[#FDE8E8] p-4 rounded-lg flex flex-col items-center shadow-md"
              >
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm font-bold text-black">{player.name}</p>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-[#00253E] text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
            onClick={handleNewGame}
          >
            NOUVELLE PARTIE
          </button>
          <button
            className="w-full bg-[#981B20] text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-800 transition duration-300"
            onClick={handleMenu}
          >
            RETOUR AU MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default SirenWinEnd;
