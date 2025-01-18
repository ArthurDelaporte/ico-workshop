import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllPlayers } from "../database/player";
import { getPartyInfo } from "../database/party";
import { createAventure, addTeamAventure, teamAventureReject, finalizeAventure } from "../database/aventure";

const CrewSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [players, setPlayers] = useState([]);
  const [party, setParty] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [aventure, setAventure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [disabledBtnEquipage, setDisabledBtnEquipage] = useState(false);

  const maxCrewSize = 3;

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    setLoading(true);

      Promise.all([getAllPlayers(partyId), getPartyInfo(partyId), createAventure(partyId)])
          .then(([fetchedPlayers, fetchedParty, aventureData]) => {
              if (!fetchedPlayers || fetchedPlayers.length === 0) {
                  setError("Aucun joueur trouvé pour cette partie.");
              } else {
                  setPlayers(fetchedPlayers);
              }

              if (!fetchedParty) {
                  setError("Impossible de récupérer les informations de la partie.");
              } else {
                  setParty(fetchedParty);
              }

              if (!aventureData) {
                  setError("Impossible de créer l'aventure.");
              } else {
                  setAventure(aventureData);
              }
          })
          .catch((err) => {
              console.error("Erreur lors de la récupération des données :", err);
              setError("Une erreur est survenue. Veuillez réessayer.");
          })
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
    if (selectedCrew.length === maxCrewSize && aventure) {
      try {
        const sortedCrew = [...selectedCrew].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        await addTeamAventure(aventure.id, sortedCrew.map(player => player.id)).then(() => {
            navigate(`/player-turn?partyId=${partyId}`);
        });
      } catch (err) {
        setError("Une erreur est survenue lors de la validation.");
      }
    } else {
      alert(`Vous devez sélectionner ${maxCrewSize} membres.`);
    }
  };

    const handleCrewAccepted = async (accepted) => {
        if (accepted && aventure) {
            try {
                const sortedCrew = [...selectedCrew].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                await addTeamAventure(aventure.id, sortedCrew.map(player => player.id)).then(() => {
                    navigate(`/player-turn?partyId=${partyId}`);
                });
            } catch (err) {
                console.error("Erreur lors de l'ajout de l'équipe à l'aventure :", err);
                setError("Une erreur est survenue lors de la validation de l'équipage.");
            }
        } else {
            try {
                setSelectedCrew([]);
                await teamAventureReject(aventure.id);

                // Récupérer l'état mis à jour de l'aventure
                const updatedAventure = await getPartyInfo(partyId).then(party => party.aventures.slice(-1)[0]);

                if (updatedAventure.team1_status === "reject" && updatedAventure.team2_status === "reject") {
                    await finalizeAventure(partyId);
                    navigate(`/new-captain-reveal?partyId=${partyId}`);
                }
            } catch (err) {
                console.error("Erreur lors du rejet de l'équipage :", err);
                setError("Une erreur est survenue lors du rejet de l'équipage.");
            }
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
          {party?.aventures?.length !== 0 && (
              <p className="text-sm">Scores : Marins {party.score_marins} | Pirates {party.score_pirates}</p>
          )}
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

      {party?.aventures?.length === 0 ? (
          <div className="flex flex-col gap-4 items-center w-full max-w-md px-24">
              <button
                  className="bg-[#DED0B1] text-[#00253E] font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
                  onClick={handleConfirmCrew}
                  disabled={selectedCrew.length !== maxCrewSize}
              >
                  CONFIRMER L’ÉQUIPAGE
              </button>
              <button
                  className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
                  onClick={() => navigate('/')}
              >
                  QUITTER LA PARTIE
              </button>
          </div>
      ) : (
          <div className="px-24">
              {selectedCrew.length !== 0 ? (
                  <div className="flex flex-col gap-4 items-center w-full max-w-md">
                      <button
                          className="bg-[#DED0B1] text-[#00253E] font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
                          onClick={() => handleCrewAccepted(true)}
                          disabled={selectedCrew.length !== maxCrewSize}
                      >
                          ÉQUIPAGE ACCEPTÉ
                      </button>
                      <button
                          className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
                          onClick={() => handleCrewAccepted(false)}
                          disabled={selectedCrew.length !== maxCrewSize}
                      >
                          ÉQUIPAGE REFUSÉ
                      </button>
                  </div>
              ) : (
                  <button
                      className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-full text-center shadow-md text-2xl"
                      onClick={() => navigate('/')}
                  >
                      QUITTER LA PARTIE
                  </button>

              )}
          </div>
      )}

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
