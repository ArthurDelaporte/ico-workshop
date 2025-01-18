import React from 'react';
import { useNavigate } from 'react-router-dom';

const RevealCards = ({ cards }) => {
  const navigate = useNavigate();

  const sampleCards = [
    { id: 1, name: 'Carte Action', img: '/img/card/action_card.png' },
    { id: 2, name: 'Carte Action', img: '/img/card/action_card.png' },
    { id: 3, name: 'Carte Action', img: '/img/card/action_card.png' },
  ];

  const displayedCards = cards || sampleCards;

  const handleOkClick = () => {
    navigate('/shipment-return');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <h1 className="text-2xl font-bold text-[#981B20] mb-4">RETOUR DE L'EXPÉDITION</h1>
      <p className="text-center text-white text-sm mb-4">
        1 point pour les pirates s'il y a au moins 1 carte poison <br />
        1 point pour les marins s'il y a 3 cartes îles
      </p>

      <div className="flex flex-col items-center space-y-2">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="relative flex items-center justify-center"
            style={{
              width: '180px',
              height: '250px',
            }}
          >
            <img
              src={card.img}
              alt={card.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <button
          className="w-20 text-2xl bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
          onClick={handleOkClick}
      >
        OK
      </button>
    </div>
  );
};

export default RevealCards;
