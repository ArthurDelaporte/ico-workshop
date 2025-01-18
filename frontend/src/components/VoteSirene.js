import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VoteSirene = ({ players = [], scores = { marins: 0, pirates: 0 } }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();
  const handleVote = (player) => {
    setSelectedPlayer(player);
  };

  const handleConfirmVote = () => {
    if (selectedPlayer) {
      console.log(`Vote confirmé pour : ${selectedPlayer.name}`);
      // Ajouter la logique backend ici
    } else {
      alert('Veuillez sélectionner un joueur avant de confirmer.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Titre */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#981B20]">VOTE POUR TROUVER LA SIRÈNE</h1>
        <p className="text-sm text-white mt-2">
          Les pirates doivent voter pour savoir qui est la sirène !
        </p>
        <p className="text-sm text-white mt-2">
          <strong>Scores :</strong> Marins {scores?.marins || 0} | Pirates {scores?.pirates || 0}
        </p>
      </div>

      {/* Liste des joueurs */}
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        {players.map((player) => {
          const isSelected = selectedPlayer?.id === player.id;
          return (
            <div
              key={player.id}
              className={`relative rounded-lg cursor-pointer shadow-lg ${
                isSelected ? 'bg-[#981B20] text-white' : 'bg-[#DED0B1]'
              }`}
              onClick={() => handleVote(player)}
              style={{ width: '100px', height: '120px' }}
            >
              <div className="flex flex-col items-center justify-center p-2 h-full">
                <img
                  src="/img/card/tete_de_mort.png"
                  alt="Icone joueur"
                  className="w-14 h-14 mb-2"
                />
                <p className="font-bold">{player.name}</p>
              </div>
              {/* Bande blanche en bas */}
              <div className="bg-white w-full h-4 rounded-b-lg"></div>
            </div>
          );
        })}
      </div>

      {/* Bouton Quitter */}
      <button
            className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
            onClick={() => navigate('/')}
      >
        QUITTER LA PARTIE
      </button>
    </div>
  );
};

export default VoteSirene;
