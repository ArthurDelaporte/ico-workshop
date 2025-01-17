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

    const maxCrewSize = 3; // Taille maximale de l'équipage

    // Charger les joueurs, les infos de la partie et créer une aventure
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
                await addTeamAventure(aventure.id, sortedCrew.map(player => player.id))
                navigate(`/player-turn?partyId=${partyId}`);
            } catch (err) {
                console.error("Erreur lors de l'ajout de l'équipe à l'aventure :", err);
                setError("Une erreur est survenue lors de la validation de l'équipage.");
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
                <p className="text-xl font-bold text-gray-700">Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
                <p className="text-xl font-bold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
            <div className="bg-red-600 text-white text-center py-4 px-6 rounded-lg mb-6 w-full max-w-md">
                <h1 className="text-xl font-bold">CHOISIS TON ÉQUIPAGE</h1>
                <p className="text-sm">Annoncez aux joueurs votre équipage de {maxCrewSize} membres (Tu peux en faire partie)</p>
            </div>

            {players.length === 0 ? (
                <p className="text-gray-700">Aucun joueur disponible.</p>
            ) : (
                <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
                    {players.map((player) => (
                        <div
                            key={player.id}
                            className={`p-4 border rounded-lg text-center cursor-pointer ${
                                selectedCrew.some((p) => p.id === player.id) ? 'bg-teal-500 text-white' : 'bg-white'
                            }`}
                            onClick={() => toggleCrewMember(player)}
                        >
                            <div className="text-2xl text-gray-600">
                                <i className="fas fa-user"></i>
                            </div>
                            <p className="mt-2 font-bold">{player.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {party?.aventures?.length === 0 ? (
                <button
                    className="w-fit h-12 mb-4 px-3 bg-teal-600 text-white text-xl rounded flex items-center justify-center hover:bg-teal-700 transition duration-300"
                    onClick={handleConfirmCrew}
                    disabled={selectedCrew.length !== maxCrewSize}
                >
                    Confirmer cet équipage
                </button>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-bold text-gray-700">Cet équipage a été accepté ?</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            className="w-fit h-12 px-3 bg-teal-600 text-white text-xl rounded hover:bg-teal-700 transition duration-300"
                            onClick={() => handleCrewAccepted(true)}
                        >
                            Oui
                        </button>
                        <button
                            className="w-fit h-12 px-3 bg-red-600 text-white text-xl rounded hover:bg-red-700 transition duration-300"
                            onClick={() => handleCrewAccepted(false)}
                        >
                            Non
                        </button>
                    </div>
                </div>
            )}

            <button
                className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 transition duration-300"
                onClick={() => navigate('/')}
            >
                QUITTER LA PARTIE
            </button>
        </div>
    );
};

export default CrewSelection;