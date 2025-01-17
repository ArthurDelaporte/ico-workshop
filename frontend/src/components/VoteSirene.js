import React, { useState } from 'react';

const VoteSirene = ({ players, scores }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleVote = (player) => {
    setSelectedPlayer(player);
  };

  const handleConfirmVote = () => {
    if (selectedPlayer) {
      console.log(`Vote confirmé pour : ${selectedPlayer.name}`);
      // Ajouter la logique back 
    } else {
      alert('Veuillez sélectionner un joueur avant de confirmer.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-6 py-8">
      <div className="text-center bg-red-600 text-white py-4 px-6 rounded-lg mb-6 w-full max-w-md">
        <h1 className="text-xl font-bold">VOTE POUR TROUVER LA SIRÈNE</h1>
        <p className="text-sm mt-2">Les pirates doivent voter pour savoir qui est la sirène !</p>
        <p className="text-sm mt-2">
          <strong>Scores :</strong> Marins {scores.marins} | Pirates {scores.pirates}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 border rounded-lg text-center cursor-pointer ${
              selectedPlayer?.id === player.id ? 'bg-teal-500 text-white' : 'bg-white'
            }`}
            onClick={() => handleVote(player)}
          >
            <div className="text-2xl text-gray-600">
              <i className="fas fa-user"></i>
            </div>
            <p className="mt-2 font-bold">{player.name}</p>
          </div>
        ))}
      </div>

      <button
        className="w-fit h-12 mb-4 px-3 bg-teal-600 text-white text-xl rounded flex items-center justify-center hover:bg-teal-700 transition duration-300"
        onClick={handleConfirmVote}
      >
        Confirmer le vote
      </button>

      <button
        className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 transition duration-300"
        onClick={() => console.log('Quitter la partie')}
      >
        QUITTER LA PARTIE
      </button>
    </div>
  );
};

export default VoteSirene;
