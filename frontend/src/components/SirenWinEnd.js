import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {getSirene} from "../database/player";

const SirenWinEnd = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('partyId');

  const [sirene, setSirene] = useState(null);
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
              const sireneData = await getSirene(partyId);
              setSirene(sireneData);
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
      <div
          className="relative flex flex-col items-center justify-center p-6 rounded-lg w-[90%] max-w-[380px] text-center"
          style={{
            backgroundImage: `url('/img/startgame/background_card.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '640px',
            borderRadius: '25px',
          }}
      >
        <h1 className="text-3xl font-bold text-[#00253E] text-center mb-4">
          LA SIRÈNE REMPORTE LA PARTIE SEULE !
        </h1>
        <p className="text-lg text-center leading-relaxed text-black mb-6">
          En déjouant les plans des pirates et des marins, la sirène a su garder son identité
          secrète et remporte la partie seule. Félicitations !
        </p>
        <div
            className="bg-[#00253E] p-4 rounded-lg w-40 mb-6"
        >
            <img
                src='/img/card/sirene.png'
                alt={sirene?.name}
                className="mx-auto mb-4"
                style={{width: '150px', height: '150px', borderRadius: '10px'}}
            />
            <div className="bg-[#00253E] w-full h-6 flex items-center justify-center rounded-b-lg">
                <p className="text-lg font-bold text-[#E2DAC7]">{sirene?.name}</p>
            </div>
        </div>
        <div className="flex flex-col gap-4 text-lg">
          <button
              className="w-60 bg-[#00253E] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={handleNewGame}
          >
              NOUVELLE PARTIE
          </button>
          <button
              className="w-60 bg-[#981B20] text-white font-bold py-3 rounded-lg hover:bg-red-800 transition duration-300"
              onClick={handleMenu}
          >
            RETOUR AU MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default SirenWinEnd;
