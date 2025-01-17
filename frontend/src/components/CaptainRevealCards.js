import React from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainRevealCards = () => {
  const navigate = useNavigate();

  const handleReveal = () => {
    console.log('Cartes dévoilées.');
    navigate('/reveal-cards');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">Louis (Capitaine)</h1>
        <p className="text-lg font-semibold text-red-500 mt-4">C'EST TON TOUR !</p>
        <p className="text-sm text-gray-600 mt-2">
          Passez le téléphone au capitaine pour dévoiler les cartes.
        </p>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleReveal}
        >
          DEVOILER LES CARTES
        </button>
      </div>
    </div>
  );
};

export default CaptainRevealCards;
