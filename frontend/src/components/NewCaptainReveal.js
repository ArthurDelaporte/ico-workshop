import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getActualCaptainInfo, getPartyInfo } from "../database/party";

const CaptainRoleReveal = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const partyId = searchParams.get('partyId');

    const [captain, setCaptain] = useState(null);
    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!partyId) {
                setError("Aucun ID de partie fourni.");
                setLoading(false);
                return;
            }

            try {
                const [captainData, partyData] = await Promise.all([
                    getActualCaptainInfo(partyId),
                    getPartyInfo(partyId)
                ]);

                if (!captainData) {
                    throw new Error("Aucun capitaine trouvé. Vérifiez la configuration des joueurs.");
                }
                setCaptain(captainData);

                if (!partyData) {
                    throw new Error("Impossible de récupérer les informations de la partie.");
                }

                setParty(partyData);

            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err);
                setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [partyId]);

    const handleNext = () => {
        if (!party) {
            console.error("Données de la partie non chargées.");
            return;
        }

        if (party?.aventures?.length === 0) {
            navigate(`/game-instructions?partyId=${partyId}`);
        } else {
            navigate(`/crew-selection?partyId=${partyId}`);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
                <p className="text-xl font-bold text-gray-700">Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
                <p className="text-xl font-bold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
            {/* Conteneur principal */}
            <div
                className="relative p-6 w-[90%] max-w-[380px] text-center"
                style={{
                    backgroundImage: `url('/img/startgame/background_card.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '420px',
                    borderRadius: '25px',
                }}
            >
                {/* Icône tete de mort */}
                <img
                    src="/img/homepage/tete_de_mort.png"
                    alt="Icone"
                    className="mx-auto mb-4"
                    style={{ width: 'auto', height: 'auto' }}
                />

                {/* Informations du capitaine */}
                <p className="text-3xl font-bold text-[#00253E]">{captain.name} (Capitaine)</p>
                <p className="text-4xl font-bold text-[#981B20] mt-4">C'EST TON TOUR !</p>
                <p className="text-sm font-thin italic text-[#00253E] mt-2">Passez le téléphone au joueur</p>

                {/* Bouton OK */}
                <button
                    className="w-20 bg-[#00253E] text-white py-3 rounded-lg mt-28 hover:bg-gray-800 transition duration-300"
                    onClick={handleNext}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default CaptainRoleReveal;
