import React from 'react';
import { useNavigate } from 'react-router-dom';

const RevealCards = ({ cards }) => {
    const navigate = useNavigate();
  const sampleCards = [
    { id: 1, name: 'Carte Action', img: '/path/to/image1.png' },
    { id: 2, name: 'Carte Action', img: '/path/to/image2.png' },
    { id: 3, name: 'Carte Action', img: '/path/to/image3.png' },
  ];

  const displayedCards = cards || sampleCards;

  const handleOkClick = () => {
    navigate('/voting-rules');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-6 py-8">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-red-500 mb-4">RETOUR DE L'EXPÉDITION</h1>
      <p className="text-lg mb-6 text-center">
        1 point pour les pirates s'il y a au moins 1 carte poison <br />
        1 point pour les marins s'il y a 3 cartes îles
      </p>

      {/* Affichage des cartes */}
      <div className="grid grid-cols-1 gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center"
          >
            <img
              src={card.img}
              alt={card.name}
              className="w-40 h-40 object-contain"
            />
          </div>
        ))}
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleOkClick}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RevealCards;
