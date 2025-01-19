import React, {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {getAllPiratesSirene} from "../database/player";
import {updatePartyStatus} from "../database/party";

const VoteSirene = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const partyId = searchParams.get('partyId');

    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            if (!partyId) {
                setError("ID de la partie manquant.");
                setLoading(false);
                return;
            }

            try {
                const playerData = await getAllPiratesSirene(partyId);
                const updatedPlayers = playerData.map(player => ({
                    ...player,
                    img: `/img/card/${player.card.img}.png`
                }));
                setPlayers(updatedPlayers);
            } catch (err) {
                console.error("Erreur lors de la récupération des joueurs :", err);
                setError("Impossible de récupérer les joueurs.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [partyId]);

    const handleVote = (player) => {
        setSelectedPlayer(player);
    };

    const handleConfirmVote = async () => {
        if (selectedPlayer) {
            if (selectedPlayer.card.name === 'Sirène') {
                await updatePartyStatus(partyId, "finished_pirates");
                navigate(`/pirates-win-end?partyId=${partyId}`);
            } else {
                await updatePartyStatus(partyId, "finished_sirene");
                navigate(`/siren-win-end?partyId=${partyId}`);
            }
        } else {
            alert('Veuillez sélectionner un joueur avant de confirmer.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-[#981B20]">VOTE POUR TROUVER LA SIRÈNE</h1>
              <p className="text-xl text-white mt-2">
                  Les pirates doivent voter pour savoir qui est la sirène !
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {players.map((player) => {
                    const isSelected = selectedPlayer?.id === player.id;
                    return (
                        <div
                            key={player.id}
                            className="relative cursor-pointer shadow-lg"
                            onClick={() => handleVote(player)}
                            style={{width: "120px", height: "140px"}}
                        >
                            <div
                                className="flex flex-col items-center justify-center p-2 bg-[#DED0B1] rounded-t-lg"
                                style={{height: "85%"}}
                            >
                                <img
                                    src={isSelected ? "/img/card/tete_de_mort_rouge.png" : "/img/homepage/tete_de_mort.png"}
                                    alt="Icone"
                                    className="w-14 h-14 mb-2"
                                />
                            </div>
                            <div className="bg-[#E2DAC7] w-full h-6 flex items-center justify-center rounded-b-lg">
                                <p className="text-sm font-bold text-[#00253E]">{player.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                className="bg-[#DED0B1] text-[#00253E] font-bold py-3 px-6 rounded-lg w-80 text-center text-2xl mb-3"
                onClick={handleConfirmVote}
                disabled={selectedPlayer === null}
            >
                CONFIRMER LE VOTE
            </button>
            <button
                className="bg-[#981B20] text-white font-bold py-3 px-6 rounded-lg w-80 text-center text-2xl"
                onClick={() => navigate('/')}
            >
                QUITTER LA PARTIE
            </button>
        </div>
    );
};

export default VoteSirene;
