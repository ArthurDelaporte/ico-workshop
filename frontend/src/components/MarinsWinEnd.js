import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {getAllMarins} from "../database/player";

const MarinsWinEnd = () => {
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

  const handleNewGame = () => {
    navigate('/game-setup');
  };

  const handleMenu = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Carte principale */}
      <div
        className="relative text-black rounded-lg shadow-md w-full max-w-md p-5"
        style={{
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Titre */}
        <h1 className="text-2xl font-bold text-[#00253E] text-center mb-4">
          LES MARINS ET LA SIRÈNE REMPORTENT LA PARTIE !
        </h1>

        {loading ? (
            <p className="text-white text-center">Chargement des joueurs...</p>
        ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
        ) : (
            <>
            {/* Cartes des personnages */}
              <div className="grid grid-cols-2 gap-4 place-items-center mb-6">
                {players.length > 0 ? (
                    players.map((player, index) => (

                        <div
                            key={index}
                            className="relative cursor-pointer"
                            style={{width: "120px", height: "120px"}}
                        >
                          <div
                              className="flex flex-col items-center justify-center p-2 bg-[rgba(0,37,62)] rounded-t-lg"
                              style={{height: "85%"}}
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

        {/* Boutons */}
        <div className="flex flex-col gap-4">
          <button
              className="w-full bg-[#00253E] text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
              onClick={handleNewGame}
          >
            NOUVELLE PARTIE
          </button>
          <button
              className="w-full bg-[#981B20] text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-800 transition duration-300"
              onClick={handleMenu}
          >
            RETOUR AU MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarinsWinEnd;
