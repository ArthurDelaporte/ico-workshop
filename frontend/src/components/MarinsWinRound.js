import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarinsWinRound = ({rounds}) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/marins-win-end');
  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-6 py-8">
    <div className="bg-white text-center p-6 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="text-xl font-bold text-teal-600">
        LES MARINS ONT REMPORTÉ {rounds} MANCHES !
      </h1>
      <p className="text-sm text-gray-700 mt-4">
        Félicitations, les marins et la sirène célèbrent leur victoire ensemble !
      </p>
      <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-6 hover:bg-teal-700 transition duration-300"
          onClick={handleNext}
        >
          OK
        </button>
    </div>
  </div>
);
}

export default MarinsWinRound;
