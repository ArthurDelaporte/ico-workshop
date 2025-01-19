import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const PlayerTurnNotification = () => {
  const { players, currentPlayerIndex } = usePlayerContext();
  const navigate = useNavigate();

  const currentPlayer = players?.[currentPlayerIndex];

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const handleNext = () => {
    console.log(`Le joueur ${currentPlayer.name} passe à la sélection de carte.`);
    navigate('/action-card-selection');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E]">
      <div className="bg-[#DED0B1] p-6 rounded-lg shadow-lg text-center w-11/12 max-w-md">
        <img
          src="/img/card/pirate1.png"
          alt="Pirate Icon"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-[#00253E] mb-2">{currentPlayer.name}</h1>
        <p className="text-2xl font-bold text-[#981B20] mb-4">C’EST TON TOUR !</p>
        <p className="text-sm text-[#00253E]">Passez le téléphone au joueur.</p>
        <button
          className="bg-[#00253E] text-white font-bold py-2 px-6 rounded-lg mt-6 hover:bg-[#001F33] transition duration-300"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PlayerTurnNotification;
