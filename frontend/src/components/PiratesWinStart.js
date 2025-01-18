import React from 'react';
import { useNavigate } from 'react-router-dom';

const PiratesWinStart = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/vote-sirene');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Carte principale */}
      <div
        className="relative text-black rounded-lg shadow-md flex flex-col items-center justify-center"
        style={{
          width: '280px', // Augmentation de la largeur
          height: '320px', // Augmentation de la hauteur
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px',
        }}
      >
        {/* Logo tête de mort en fond transparent */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: "url('/img/homepage/tete_de_mort.png')",
            backgroundSize: '60%', // Taille ajustée pour mieux s'adapter
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.1, // Transparence pour l'effet de fond
          }}
        ></div>

        {/* Contenu de la carte */}
        <h1 className="relative text-lg font-bold text-[#981B20] text-center mb-4 z-10 px-4">
          LES PIRATES ONT REMPORTÉ 10 MANCHES !
        </h1>
        <p className="relative text-sm text-center leading-relaxed text-black z-10 px-4">
          Mais pour gagner ils doivent voter pour identifier la sirène; si la majorité se trompe, la sirène gagne la partie seule.
        </p>
        <button
          className="relative w-2/3 bg-black text-white font-bold py-2 rounded-lg mt-6 shadow-md hover:bg-gray-800 transition duration-300 z-10"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PiratesWinStart;
