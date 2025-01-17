import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';
import {getLastAventureInfo, updateAventureChoice} from "../database/aventure";
import { getPlayerInfo } from "../database/player";
import {updatePartyStatus} from "../database/party";

const PlayerCardChoice = () => {
  const { nextPlayer } = usePlayerContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [selectedCard, setSelectedCard] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect( () => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    const fetchAventureInfo = async () => {
      try {
        const aventure = await getLastAventureInfo(partyId);

        if (!aventure || !aventure.team) {
          throw new Error("Aucune aventure en cours.");
        }

        const nullChoicesCount = aventure.team.filter(member => member.choice === null).length;
        const playerIndex = (3 - (nullChoicesCount % 3)) % 3;

        setCurrentPlayerIndex(playerIndex);

        const playerId = aventure.team[playerIndex].playerId;
        const playerInfo = await getPlayerInfo(playerId);
        setCurrentPlayer(playerInfo);

        setShuffledCards(shuffleArray([{name:'ile', img: '/img/card/ile.png', disabled: false},
          {name: 'poison', img: '/img/card/poison.png', disabled: playerInfo.card.name !== 'Pirate'}]));
      } catch (err) {
        console.error("Erreur lors de la récupération de l'aventure :", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchAventureInfo();
  }, [partyId]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
          <p className="text-xl font-bold text-gray-700">Chargement...</p>
        </div>
    );
  }

  if (error || !currentPlayer) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-8">
          <p className="text-xl font-bold text-red-500">{error || "Erreur : Joueur actuel introuvable."}</p>
        </div>
    );
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = async () => {
    if (!selectedCard || isChecking) return;
    setIsChecking(true);

    try {
      nextPlayer();

      await updateAventureChoice(partyId, selectedCard, currentPlayerIndex).then(async () => {
        if (currentPlayerIndex === 2){
          await updatePartyStatus(partyId, "ilePoisonReveal");
          navigate(`/captain-reveal-cards?partyId=${partyId}`);
        } else {
          navigate(`/player-turn?partyId=${partyId}`);
        }
      });

    } catch (err) {
      console.error("Erreur lors de la validation de la carte :", err);
      setError("Une erreur est survenue lors de la sélection.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
      <div className="flex flex-col items-center min-h-screen bg-[#00253E] text-white px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-lg">
            <h1 className="text-2xl font-bold text-red-500">
              CHOISIS TA CARTE
            </h1>
            <p className="text-sm mt-2">Les Marins et la Sirène ne peuvent prendre que des cartes îles</p>
            <p className="text-sm mt-2">contrairement aux Pirates qui ont le choix entre les deux</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 max-w-md w-68">
          {shuffledCards.map((card) => (
              <button
                  key={card.name}
                  className={`py-6 rounded-lg text-black text-xl font-bold transition duration-300 w-68 ${
                      ((selectedCard && selectedCard !== card.name) || card.disabled) && ('opacity-50')
                  }`}
                  onClick={() => handleCardClick(card.name)}
                  disabled={card.disabled}
              >
                <img
                  src={card.img}
                  alt="Icone Carte Action"
                  style={{width: '240px', height: '240px'}}
                />
              </button>
          ))}
        </div>
        {selectedCard && (
            <button
                className="w-60 max-w-md text-2xl bg-black text-white py-2 rounded-lg mt-6 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConfirmSelection}
              disabled={isChecking}
          >
            SUIVANT
          </button>
        )}
      </div>
  );
};

export default PlayerCardChoice;