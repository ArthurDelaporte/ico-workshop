import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';

const ActionCardSelection = () => {
  const { players, setPlayers, nextPlayer, currentPlayerIndex } = usePlayerContext(); // Inclure nextPlayer
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');
  const maxCrewSize = 3; // Nombre maximal de joueurs dans l'équipage

  // Les membres de l'équipage sont les 3 premiers joueurs (excluant le capitaine)
  const crewPlayers = players.slice(1, maxCrewSize + 1); // Exclure le capitaine (indice 0)

  // Calculer l'index local dans l'équipage
  const crewPlayerIndex = currentPlayerIndex - 1; // Ajuster l'index pour exclure le capitaine

  // Obtenir le joueur actuel de l'équipage
  const currentPlayer = crewPlayers[crewPlayerIndex];

  if (!currentPlayer) {
    return <p className="text-red-500">Erreur : Joueur introuvable.</p>;
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (selectedCard) {
      console.log(`Le joueur ${currentPlayer.name} a choisi : ${selectedCard}`);

      // Mettre à jour la carte sélectionnée pour le joueur actuel
      const updatedPlayers = [...players];
      const globalPlayerIndex = players.findIndex(
        (player) => player.name === currentPlayer.name
      );
      updatedPlayers[globalPlayerIndex] = {
        ...currentPlayer,
        selectedCard: selectedCard, // Sauvegarder la carte sélectionnée
      };
      setPlayers(updatedPlayers);

      // Passer au joueur suivant ou terminer
      if (crewPlayerIndex + 1 < maxCrewSize) {
        console.log(`Passer au joueur suivant, index local : ${crewPlayerIndex + 1}`);
        nextPlayer(); // Passer au joueur suivant dans le contexte global
        setSelectedCard(''); // Réinitialiser la sélection pour le joueur suivant
        navigate('/player-turn-notification'); // Redirige vers la notification du joueur suivant
      } else {
        console.log("Tous les joueurs de l'équipage ont choisi leurs cartes.");
        navigate('/captain-reveal-cards'); // Redirige vers la page du capitaine
      }
    } else {
      alert('Veuillez sélectionner une carte.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
      {/* Indicateur du joueur */}
      <div className="w-full max-w-md">
        <div className="text-center bg-black py-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-red-500">
            JOUEUR {crewPlayerIndex + 1} / {maxCrewSize}
          </h1>
          <p className="text-lg mt-2 text-white">Nom : {currentPlayer.name}</p>
          <p className="text-sm mt-2">Carte sélectionnée : {selectedCard || 'Aucune'}</p>
        </div>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 gap-4 max-w-md w-full">
        <button
          className={`p-6 rounded-lg shadow-md text-black bg-white text-xl font-bold ${
            selectedCard === 'ILE' ? 'ring-4 ring-teal-500' : ''
          }`}
          onClick={() => handleCardClick('ILE')}
        >
          ILE
        </button>
        <button
          className={`p-6 rounded-lg shadow-md text-black bg-white text-xl font-bold ${
            selectedCard === 'POISON' ? 'ring-4 ring-teal-500' : ''
          }`}
          onClick={() => handleCardClick('POISON')}
        >
          POISON
        </button>
      </div>

      {/* Bouton de confirmation */}
      <button
        className="w-full max-w-md bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
        onClick={handleConfirmSelection}
      >
        CONFIRMER
      </button>
    </div>
  );
};

export default ActionCardSelection;
