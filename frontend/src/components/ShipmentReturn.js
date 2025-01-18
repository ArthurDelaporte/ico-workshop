import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentReturn = () => {
  const navigate = useNavigate();

  const cards = [
    { id: 1, img: '/img/card/ile.png' },
    { id: 2, img: '/img/card/poison.png' },
    { id: 3, img: '/img/card/ile.png' },
  ];

  const handleNextRound = () => {
    navigate('/next-round');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <h1 className="text-2xl font-bold text-[#981B20] mb-2">RETOUR DE L'EXPÉDITION</h1>
      <p className="text-center text-white text-sm mb-6">1 point pour les pirates !</p>
      <div className="flex flex-col items-center space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex items-center justify-center rounded-lg"
            style={{
              width: '180px',
              height: '250px',
            }}
          >
            <img
              src={card.img}
              alt="Carte action"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Bouton Manche Suivante */}
      <button
        className="mt-6 bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        onClick={handleNextRound}
      >
        MANCHE SUIVANTE
      </button>
    </div>
  );
};

export default ShipmentReturn;
