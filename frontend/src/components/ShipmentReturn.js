import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {changeCaptain, getLastAventureChoices} from "../database/aventure";
import {getPartyInfo, updatePartyStatus} from "../database/party";

const ShipmentReturn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [cards, setCards] = useState([]);
  const [party, setParty] = useState({});
  const [rolePoint, setRolePoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([getPartyInfo(partyId), getLastAventureChoices(partyId)])
      .then(([fetchedParty, choices]) => {
        if (!fetchedParty) {
          setError("Impossible de récupérer les informations de la partie.");
        } else {
          setParty(fetchedParty);
        }

        if (!choices || choices.length === 0) {
          throw new Error("Aucune carte disponible.");
        }

        if (choices.includes("poison")) {
          setRolePoint("pirates");
        } else {
          setRolePoint("marins");
        }

        const shuffledCards = choices.sort(() => Math.random() - 0.5);

        const mappedCards = shuffledCards.map((choice, index) => ({
          id: index,
          img: `/img/card/${choice}.png`,
        }));

        setCards(mappedCards);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des choix :", err);
        setError(err.message || "Une erreur est survenue.");
      })
      .finally(() => setLoading(false));
  }, [partyId]);

  const handleNextRound = async () => {
    if (party.score_marins === 10 ) {
        await updatePartyStatus(partyId, "finished_marins");
        navigate(`/marins-win-round?partyId=${partyId}`);
    } else if (party.score_pirates === 10) {
        navigate(`/pirates-win-start?partyId=${partyId}`);
    }

    await changeCaptain(partyId);
    await updatePartyStatus(partyId, "ilePoisonChoices");
    if (party?.aventures?.length === 1) {
        navigate(`/voting-rules?partyId=${partyId}`);
    } else {
        navigate(`/new-captain-reveal?partyId=${partyId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        <p className="text-2xl font-bold text-white">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        <p className="text-2xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <p className="text-3xl font-bold text-[#981B20] mb-4">RETOUR DE L'EXPÉDITION</p>
      <p className="flex items-center text-center text-white text-sm mb-12 h-10">1 point pour les {rolePoint} !</p>
      <div className="flex flex-col items-center gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex items-center justify-center rounded-lg"
            style={{
              width: '180px',
              height: '180px',
            }}
          >
            <img
              src={card.img}
              alt="Carte action"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Bouton Manche Suivante */}
      <button
        className="mt-12 text-2xl bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
        onClick={handleNextRound}
      >
        MANCHE SUIVANTE
      </button>
    </div>
  );
};

export default ShipmentReturn;
