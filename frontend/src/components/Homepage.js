import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#00253E] px-6 py-8">
      {/* Logo */}
      <div className="text-center mt-8">
        <img
          src="/img/homepage/logo_ico.png"
          alt="Logo ICO"
          className="w-auto  h-24 mx-auto mb-4"
        />
      </div>

      {/* Texte d'invitation */}
      <p className="text-[#DED0B1] text-center text-sm mt-4 underline">
        Inscrivez-vous ou connectez-vous à votre compte
      </p>

      {/* Boutons */}
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          className="w-full bg-[#981B20] text-white text-lg font-bold py-3 rounded-lg hover:bg-[#7b1619] transition duration-300"
          onClick={() => navigate('/signup')}
        >
          INSCRIPTION
        </button>
        {!user ? (
          <button
            className="w-full bg-[#DED0B1] text-black text-lg font-bold py-3 rounded-lg hover:bg-[#c9b59a] transition duration-300"
            onClick={() => navigate('/signin')}
          >
            Connexion
          </button>
        ) : (
          <button
            className="w-full bg-[#DED0B1] text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={() => logout()}
          >
            Déconnexion
          </button>
        )}
        <button
          className="w-full bg-black text-white text-lg font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          onClick={() => navigate('/game-setup')}
        >
          Commencer une partie
        </button>
      </div>

      <button
        className="text-[#DED0B1] text-sm underline mt-4 mb-8 underline"
        onClick={() => navigate('/feedback-form')}
      >
        Contact
      </button>

      <button
        className="text-[#DED0B1] text-sm underline mt-4 mb-8 underline"
        onClick={() => navigate('/legal-mentions')}
      >
        mentions légales
      </button>
    </div>
  );
};

export default HomePage;
