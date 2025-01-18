import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarinsWinRound = ({ rounds, players = [] }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/marins-win-end');
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
        <h1 className="text-lg font-bold text-teal-600 text-center mb-4">
          LES MARINS ONT REMPORTÉ {rounds} MANCHES !
        </h1>

        <p className="text-sm text-center leading-relaxed text-black mb-4">
          Félicitations, les marins et la sirène célèbrent leur victoire ensemble !
        </p>
        <div className="grid grid-cols-2 gap-4">
          {players.length > 0 ? (
            players.map((player, index) => (
              <div
                key={index}
                className="bg-[#C5E4E7] p-4 rounded-lg flex flex-col items-center shadow-md"
              >
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm font-bold text-black">{player.name}</p>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-2">
              Aucun joueur à afficher
            </p>
          )}
        </div>

        {/* Bouton */}
        <div className="mt-6">
          <button
            className="w-full bg-black text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
            onClick={handleNext}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarinsWinRound;
