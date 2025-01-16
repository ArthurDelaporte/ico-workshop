import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const CrewSelection = () => {
  const { players } = usePlayerContext();
  const navigate = useNavigate();

  const [selectedCrew, setSelectedCrew] = useState([]);

  const maxCrewSize = 3; // Taille maximale de l'équipage

  const toggleCrewMember = (player) => {
    if (selectedCrew.includes(player)) {
      // Si le joueur est déjà sélectionné, le retirer
      setSelectedCrew(selectedCrew.filter((p) => p !== player));
    } else if (selectedCrew.length < maxCrewSize) {
      // Ajouter le joueur si la taille de l'équipage n'est pas dépassée
      setSelectedCrew([...selectedCrew, player]);
    }
  };

  const handleConfirm = () => {
    if (selectedCrew.length === maxCrewSize) {
      console.log('Équipage sélectionné :', selectedCrew);
      navigate('/player-turn');
    } else {
      alert(`Vous devez sélectionner ${maxCrewSize} membres.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
      <div className="bg-red-600 text-white text-center py-4 px-6 rounded-lg mb-6 w-full max-w-md">
        <h1 className="text-xl font-bold">CHOISIS TON ÉQUIPAGE</h1>
        <p className="text-sm">Annoncez aux joueurs votre équipage de {maxCrewSize} membres (Tu peux en faire partie)</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        {players.map((player, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg text-center cursor-pointer ${
              selectedCrew.includes(player) ? 'bg-teal-500 text-white' : 'bg-white'
            }`}
            onClick={() => toggleCrewMember(player)}
          >
            <div className="text-2xl text-gray-600">
              <i className="fas fa-user"></i>
            </div>
            <p className="mt-2 font-bold">{player.name}</p>
          </div>
        ))}
      </div>
      <button
        className="w-full bg-red-600 text-white py-3 rounded-lg mb-4 hover:bg-red-700 transition duration-300"
        onClick={() => navigate('/')}
      >
        QUITTER LA PARTIE
      </button>
      <button
        className="w-12 h-12 bg-teal-600 text-white text-xl rounded-full flex items-center justify-center hover:bg-teal-700 transition duration-300"
        onClick={handleConfirm}
      >
        +
      </button>
    </div>
  );
};

export default CrewSelection;
