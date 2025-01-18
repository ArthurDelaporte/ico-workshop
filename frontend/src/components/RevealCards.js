import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

const RevealCards = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const partyId = searchParams.get('partyId');

    const displayedCards = [
      { name: 'Carte Action', img: '/img/card/action_card.png' },
      { name: 'Carte Action', img: '/img/card/action_card.png' },
      { name: 'Carte Action', img: '/img/card/action_card.png' },
    ];

    const handleOkClick = () => {
    navigate(`/shipment-return?partyId=${partyId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
            <p className="text-3xl font-bold text-[#981B20] mb-4">RETOUR DE L'EXPÉDITION</p>
            <p className="text-center text-white text-sm mb-12 h-10">
                1 point pour les pirates s'il y a au moins 1 carte poison <br />
                1 point pour les marins s'il y a 3 cartes îles
            </p>

            <div className="flex flex-col items-center gap-8">
                {displayedCards.map((card) => (
                    <div
                        key={card}
                        className="relative flex items-center justify-center"
                        style={{
                            width: '180px',
                            height: '180px',
                        }}
                    >
                        <img
                            src={card.img}
                            alt={card.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            <button
                className="w-20 text-2xl bg-black text-white py-3 rounded-lg mt-12 hover:bg-gray-800 transition duration-300"
                onClick={handleOkClick}
            >
                OK
            </button>
        </div>
    );
};

export default RevealCards;
