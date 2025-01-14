import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col justify-center items-center px-6 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-8">Bienvenue sur ICO Game</h2>

        {/* Boutons stylisés et alignés verticalement */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/signup"
            className="w-full text-center bg-teal-600 text-white py-4 text-lg font-medium rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Inscription
          </Link>

          <Link
            to="/login"
            className="w-full text-center bg-teal-600 text-white py-4 text-lg font-medium rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Connexion
          </Link>

          <button
            onClick={() => alert('Inviter une personne')}
            className="w-full text-center bg-teal-600 text-white py-4 text-lg font-medium rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Inviter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
