import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayerContext } from '../PlayerContext';
import {getLastAventureInfo, updateAventureChoice, finalizeAventure} from "../database/aventure";
import { getPlayerInfo } from "../database/player";
import {updatePartyStatus} from "../database/party";

const ActionCardSelection = () => {
  const { nextPlayer } = usePlayerContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [selectedCard, setSelectedCard] = useState('');
  const [aventureInfo, setAventureInfo] = useState(getPlayerInfo(partyId));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [shuffledCards, setShuffledCards] = useState([]);

  // Récupérer l'index du joueur actuel via l'aventure
  useEffect(() => {
    if (!partyId) {
      setError("ID de la partie manquant.");
      setLoading(false);
      return;
    }

    const fetchAventureInfo = async () => {
      try {
        const aventure = await getLastAventureInfo(partyId);

        setAventureInfo(aventure)

        if (!aventure || !aventure.team) {
          throw new Error("Aucune aventure en cours.");
        }

        // Calculer l'index du joueur en fonction du nombre de choix à `null`
        const nullChoicesCount = aventure.team.filter(member => member.choice === null).length;
        const playerIndex = (3 - (nullChoicesCount % 3)) % 3;

        setCurrentPlayerIndex(playerIndex);

        // Récupérer les infos du joueur actuel
        const playerId = aventure.team[playerIndex].playerId;
        const playerInfo = await getPlayerInfo(playerId);
        setCurrentPlayer(playerInfo);

        // Générer un ordre aléatoire pour les cartes
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

  // Fonction pour mélanger aléatoirement un tableau
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

      await updateAventureChoice(partyId, selectedCard, currentPlayerIndex);

      if (currentPlayerIndex === 2){
        await updatePartyStatus(partyId, "ilePoisonReveal");
        await finalizeAventure(partyId, aventureInfo.id);
        navigate(`/captain-reveal-cards?partyId=${partyId}`);
      } else {
        navigate(`/player-turn?partyId=${partyId}`);
      }

    } catch (err) {
      console.error("Erreur lors de la validation de la carte :", err);
      setError("Une erreur est survenue lors de la sélection.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
      <div className="flex flex-col items-center min-h-screen bg-[#00253E] text-white px-6 py-8">
        {/* Informations du joueur */}
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-lg">
            <h1 className="text-2xl font-bold text-red-500">
              CHOISIS TA CARTE
            </h1>
            <p className="text-sm mt-2">Les Marins et la Sirène ne peuvent prendre que des cartes îles</p>
            <p className="text-sm mt-2">contrairement aux Pirates qui ont le choix entre les deux</p>
          </div>
        </div>

        {/* Sélection des cartes (ordre aléatoire) */}
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

        {/* Bouton de confirmation */}
        {selectedCard && (
            <button
                className="w-60 max-w-md text-2xl bg-black text-white py-2 rounded-lg mt-6 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConfirmSelection}
              disabled={isChecking} // Désactiver le bouton si aucune carte sélectionnée ou vérification en cours
          >
            SUIVANT
          </button>
        )}
      </div>
  );
};

export default ActionCardSelection;