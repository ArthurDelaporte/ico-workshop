import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {getAllMarins} from '../database/player';

const MarinsWinRound = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const partyId = searchParams.get('partyId');

    const [players, setPlayers] = useState([]);
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
                const playerData = await getAllMarins(partyId);
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

    const handleNext = () => {
        navigate(`/marins-win-end?partyId=${partyId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
            <div
                className="relative text-black rounded-lg w-full max-w-md p-5"
                style={{
                    backgroundImage: "url('/img/startgame/background_card.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-2xl font-bold text-[#00253E] text-center mb-4">
                    LES MARINS ET LA SIRÈNE ONT REMPORTÉ 10 MANCHES !
                </h1>

                {loading ? (
                    <p className="text-white text-center">Chargement des joueurs...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <>
                        <p className="text-lg text-center leading-relaxed text-black mb-4">
                            Félicitations, les marins et la sirène célèbrent leur victoire ensemble !
                        </p>
                        <div className="grid grid-cols-2 gap-4 place-items-center">
                            {players.length > 0 ? (
                                players.map((player, index) => (

                                    <div
                                        key={index}
                                        className="relative cursor-pointer"
                                        style={{ width: "120px", height: "120px" }}
                                    >
                                        <div
                                            className="flex flex-col items-center justify-center p-2 bg-[rgba(0,37,62)] rounded-t-lg"
                                            style={{ height: "85%" }}
                                        >
                                            <img
                                                src={player.img}
                                                alt={player.name}
                                                className="w-20 h-20 mb-2"
                                            />
                                        </div>
                                        <div className="bg-[#00253E] w-full h-6 flex items-center justify-center rounded-b-lg">
                                            <p className="text-sm font-bold text-[#E2DAC7]">{player.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white text-center col-span-2">
                                    Aucun joueur à afficher
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Bouton */}
                <div className="mt-6 w-full flex items-center justify-center">
                    <button
                        className="w-20 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300"
                        onClick={handleNext}
                        disabled={loading}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarinsWinRound;