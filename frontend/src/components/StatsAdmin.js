import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaArrowLeft, FaGamepad, FaUserAlt, FaClock, FaChartLine, FaTimesCircle } from 'react-icons/fa';

const StatsAdmin = ({ statsData = {} }) => {
    const {
        totalGames = 0,
        abandonedGames = 0,
        averageGameTime = 0,
        medianGameTime = 0,
        totalUsers = 0,
        gamesByType = [],
        userGrowth = { dates: [], values: [] },
    } = statsData;

    const gameTypesData = {
        labels: ['Marins', 'Sirène', 'Pirates'],
        datasets: [
            {
                label: 'Nombre de parties',
                data: gamesByType,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    const userGrowthData = {
        labels: userGrowth.dates,
        datasets: [
            {
                label: 'Croissance des utilisateurs',
                data: userGrowth.values,
                fill: false,
                borderColor: '#4CAF50',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#00253E] py-6 px-4 font-sans">
            {/* Barre supérieure avec retour au Dashboard */}
                                          <div className="w-full max-w-4xl flex items-center justify-between mb-6">
                                            <button
                                              onClick={() => (window.location.href = "./dashboard")}
                                              className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
                                            >
                                              <FaArrowLeft className="mr-2" />
                                            </button>
                                            <h1
                                              className="text-4xl font-bold text-[#DED0B1] text-center"
                                              style={{ fontFamily: "'Alatsi', sans-serif" }}
                                            >
                                              Tableau de bord des statistiques
                                            </h1>
                                            <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
                                          </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaGamepad className="mr-2 text-[#AF2127]" />
                        Total des parties
                    </h2>
                    <p className="text-3xl font-bold text-[#00253E]">{totalGames}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaTimesCircle className="mr-2 text-[#CE5960]" />
                        Parties abandonnées
                    </h2>
                    <p className="text-3xl font-bold text-[#CE5960]">{abandonedGames}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaClock className="mr-2 text-[#DED0B1]" />
                        Temps moyen d'une partie
                    </h2>
                    <p className="text-3xl font-bold text-[#DED0B1]">{averageGameTime} minutes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaClock className="mr-2 text-[#DED0B1]" />
                        Temps médian d'une partie
                    </h2>
                    <p className="text-3xl font-bold text-[#DED0B1]">{medianGameTime} minutes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaUserAlt className="mr-2 text-[#AF2127]" />
                        Nombre total d'utilisateurs
                    </h2>
                    <p className="text-3xl font-bold text-[#AF2127]">{totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold text-[#00253E]">Répartition des parties par type</h2>
                    <Pie data={gameTypesData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold flex items-center text-[#00253E]">
                        <FaChartLine className="mr-2 text-[#4CAF50]" />
                        Croissance des utilisateurs
                    </h2>
                    <Bar data={userGrowthData} />
                </div>
            </div>
        </div>
    );
};

export default StatsAdmin;
