import React from 'react';
import { useNavigate } from 'react-router-dom';

const VotingRules = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/player-turn-notification');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
          className="bg-cover bg-center text-black p-6 rounded-lg shadow-md w-full max-w-md"
          style={{
            backgroundImage: `url('/img/startgame/background_card.png')`,
            borderRadius: '16px',
          }}
        >
        <h1 className="text-xl font-bold text-center text-[#981B20] mb-4">VOTEZ POUR LES EXPÉDITIONS !</h1>
        <ul className="text-sm text-black space-y-3 list-decimal list-inside leading-relaxed">
          <li>
            <span className="font-bold">ATTENTION !</span> À partir de ce tour et jusqu'à la fin de la partie, il y aura un vote lorsque trois personnes seront proposées. (La personne qui propose l'équipage est forcément pour.)
          </li>
          <li>
            Si la majorité des joueurs (ou au moins la moitié en cas de joueurs pairs) est contre, l'équipage ne part pas. Le joueur suivant propose un nouvel équipage, qui sera différent d'au moins une personne.
          </li>
          <li>
            Si l'équipage est à nouveau refusé, la personne qui l'a choisi passera son tour.
          </li>
          <li>
            Vous pouvez réitérer ce schéma jusqu'à la victoire d'une équipe, sans oublier d'utiliser vos cartes bonus à bon escient.
          </li>
        </ul>
        <button
          className="w-full bg-black text-white font-bold py-3 rounded-lg mt-6 shadow-md hover:bg-gray-800 transition duration-300"
          onClick={handleOkClick}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default VotingRules;
