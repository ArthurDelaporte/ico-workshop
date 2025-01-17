import React from 'react';
import { useNavigate } from 'react-router-dom';

const PiratesWinEnd = ({ sirenFound }) => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/game-setup');
  };

  const handleMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-6 py-8">
      <div className="bg-white text-center p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold text-red-600">
          {sirenFound
            ? 'LES PIRATES REMPORTENT LA PARTIE !'
            : 'LA SIRÈNE REMPORTENT LA PARTIE SEULE !'}
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={handleNewGame}
          >
            NOUVELLE PARTIE
          </button>
          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={handleMenu}
          >
            RETOUR AU MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiratesWinEnd;