import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllPlayers } from "../database/player";
import { getPartyInfo } from "../database/party";
import { createAventure, addTeamAventure } from "../database/aventure";

const CrewSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [players, setPlayers] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const maxCrewSize = 3;

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([getAllPlayers(partyId), getPartyInfo(partyId), createAventure(partyId)])
      .then(([fetchedPlayers]) => {
        setPlayers(fetchedPlayers);
      })
      .catch(() => setError("Une erreur est survenue."))
      .finally(() => setLoading(false));
  }, [partyId]);

  const toggleCrewMember = (player) => {
    if (selectedCrew.some((p) => p.id === player.id)) {
      setSelectedCrew(selectedCrew.filter((p) => p.id !== player.id));
    } else if (selectedCrew.length < maxCrewSize) {
      setSelectedCrew([...selectedCrew, player]);
    }
  };

  const handleConfirmCrew = async () => {
    if (selectedCrew.length === maxCrewSize) {
      try {
        const sortedCrew = [...selectedCrew].sort((a, b) => a.created_at - b.created_at);
        await addTeamAventure(partyId, sortedCrew.map((player) => player.id));
        navigate(`/player-turn?partyId=${partyId}`);
      } catch (err) {
        setError("Une erreur est survenue lors de la validation.");
      }
    } else {
      alert(`Vous devez sélectionner ${maxCrewSize} membres.`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E]">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#00253E] px-4 py-6">
      <div className="text-center text-white mb-6">
        <h1 className="text-2xl font-bold text-[#981B20]">CHOISIS TON ÉQUIPAGE</h1>
        <p className="text-sm mt-2">Constitue un équipage de {maxCrewSize} membres (Tu peux en faire partie)</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {players.map((player) => (
          <div
            key={player.id}
            className={`relative p-4 rounded-lg cursor-pointer shadow-lg ${
              selectedCrew.some((p) => p.id === player.id)
                ? 'bg-[#981B20] text-white'
                : 'bg-[#DED0B1] text-[#00253E]'
            }`}
            onClick={() => toggleCrewMember(player)}
          >
            <img
              src="/img/startgame/tete_de_mort_blanche.png"
              alt="Icone"
              className="w-full h-16 object-contain mx-auto"
            />
            <p className="mt-2 text-center font-bold">{player.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-center w-full max-w-md">
        <button
          className="bg-[#DED0B1] text-[#00253E] font-bold py-3 px-6 rounded-lg w-full text-center shadow-md"
          onClick={handleConfirmCrew}
          disabled={selectedCrew.length !== maxCrewSize}
        >
          CONFIRMER L’ÉQUIPAGE
        </button>
        <button
          className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-full text-center shadow-md"
          onClick={() => navigate('/')}
        >
          QUITTER LA PARTIE
        </button>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          className="w-14 h-14 rounded-full bg-[#981B20] flex items-center justify-center text-white text-2xl shadow-lg"
          onClick={() => alert("Ajout d'un membre !")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CrewSelection;
