import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartGame = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 py-8">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Mode hors-ligne</h1>
      <p className="text-lg text-teal-600 text-center mb-8">
        Préparez-vous à jouer en mode hors-ligne !
      </p>
      <button
        className="w-full max-w-xs bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
        onClick={() => navigate('/game-setup')}
      >
        Lancer la configuration
      </button>
    </div>
  );
};

export default StartGame;
