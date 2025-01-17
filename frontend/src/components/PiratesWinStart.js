import React from 'react';
import { useNavigate } from 'react-router-dom';

const PiratesWinStart = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/vote-sirene');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-6 py-8">
      <div className="bg-white text-center p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold text-red-600">
          LES PIRATES ONT REMPORTÉ 10 MANCHES !
        </h1>
        <p className="text-sm text-gray-700 mt-4">
          Mais pour gagner ils doivent voter pour identifier la sirène; si la majorité se trompent, la sirène gagne la partie seule.
        </p>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PiratesWinStart;
