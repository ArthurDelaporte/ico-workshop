import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import { getLastAventureChoices } from "../database/aventure";

const ShipmentReturn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [cards, setCards] = useState([]);
  const [rolePoint, setRolePoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    const fetchChoices = async () => {
      try {
        setLoading(true);
        const choices = await getLastAventureChoices(partyId);

        if (!choices || choices.length === 0) {
          throw new Error("Aucune carte disponible.");
        }

        if (choices.includes("poison")) {
            setRolePoint("pirates");
        } else {
            setRolePoint("marins");
        }

        const mappedCards = choices.map((choice, index) => ({
          id: index,
          img: `/img/card/${choice}.png`,
        }));


        const shuffledCards = mappedCards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);

      } catch (err) {
        console.error("Erreur lors de la récupération des choix :", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchChoices();
  }, [partyId]);

  const handleNextRound = () => {
    navigate(`/next-round?partyId=${partyId}`);
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
        className="mt-12 text-2xl bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        onClick={handleNextRound}
      >
        MANCHE SUIVANTE
      </button>
    </div>
  );
};

export default ShipmentReturn;
