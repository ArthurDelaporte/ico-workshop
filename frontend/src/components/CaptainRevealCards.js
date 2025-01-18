import React from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainRevealCards = () => {
  const navigate = useNavigate();

  const handleReveal = () => {
    console.log('Cartes dévoilées.');
    navigate('/reveal-cards');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E]">
      <div
        className="p-6 rounded-lg shadow-lg text-center w-11/12 max-w-md"
        style={{
          backgroundImage: `url('/img/startgame/background_card.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src="/img/homepage/tete_de_mort.png"
          alt="Pirate Icon"
          className="w-auto h-auto mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-[#00253E] mb-2">Louis (Capitaine)</h1>
        <p className="text-2xl font-bold text-[#981B20] mb-4">C’EST TON TOUR !</p>
        <p className="text-sm text-[#00253E] mb-6">Passez le téléphone au joueur.</p>
        <button
          className="bg-[#00253E] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#001F33] transition duration-300"
          onClick={handleReveal}
        >
          DEVOILER LES CARTES
        </button>
      </div>
    </div>
  );
};

export default CaptainRevealCards;
