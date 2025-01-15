import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInOrSignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-8">
      <h1 className="text-lg font-semibold text-center text-teal-700">
        Inscrivez-vous ou connectez-vous à votre compte
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => navigate('/signup')}
        >
          Inscription
        </button>
        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          onClick={() => navigate('/signin')}
        >
          Connexion
        </button>
        <button
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          onClick={() => navigate('/start-game')}
        >
          Commencer une partie
        </button>
      </div>

      <a href="#" className="text-sm text-teal-700 underline mt-4">
        mentions légales
      </a>
    </div>
  );
};

export default SignInOrSignUp;
