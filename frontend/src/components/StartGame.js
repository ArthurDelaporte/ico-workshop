import React from "react";
import { useNavigate } from "react-router-dom";

const PlayerCount = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#00253E] px-6 py-8">
      <div className="text-center mt-8">
        <img
          src="/img/startgame/tete_de_mort_blanche.png"
          alt="Logo Pirate"
          className="w-32 h-auto mx-auto"
        />
      </div>

      <div className="text-center">
        <h2 className="text-white text-lg font-bold mb-2">JOUEURS</h2>
        <div className="bg-[#DED0B1] text-black font-bold text-2xl py-2 px-8 rounded-lg">
          10
        </div>

        <div className="bg-[#DED0B1] text-black font-medium text-base py-2 px-6 rounded-lg mt-4">
          5 Marins<br />
          4 Pirates<br />
          1 Sirène
        </div>
      </div>

      <button
        onClick={() => navigate("/player-chose-name")}
        className="bg-black text-white text-xl font-bold py-3 px-16 rounded-lg mt-6 hover:bg-gray-800 transition duration-300"
      >
        COMMENCER
      </button>

      <button
        onClick={() => navigate("/")}
        className="bg-[#981B20] text-white w-12 h-12 rounded-full flex items-center justify-center mt-8 hover:bg-red-800 transition duration-300"
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      </button>
    </div>
  );
};

export default PlayerCount;