import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

const PiratesWinStart = () => {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const partyId = searchParams.get('partyId');

  const handleNext = () => {
    navigate(`/vote-sirene?partyId=${partyId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Carte principale */}
      <div
        className="relative text-black rounded-lg flex flex-col items-center justify-center"
        style={{
          width: '280px', // Augmentation de la largeur
          height: '320px', // Augmentation de la hauteur
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '25px',
        }}
      >
        {/* Logo tête de mort en fond transparent */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: "url('/img/homepage/tete_de_mort.png')",
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        ></div>

        {/* Contenu de la carte */}
        <h1 className="relative text-2xl font-bold text-[#981B20] text-center mb-4 z-10 px-3">
          LES PIRATES ONT REMPORTÉ 10 MANCHES !
        </h1>
        <p className="relative text-lg text-center leading-relaxed text-black z-10 px-4">
          Mais pour gagner ils doivent voter pour identifier la sirène ; si la majorité se trompe, la sirène gagne la partie seule.
        </p>
        <button
          className="relative w-20 bg-black text-white font-bold py-2 rounded-lg mt-6 hover:bg-gray-800 transition duration-300 z-10"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PiratesWinStart;
