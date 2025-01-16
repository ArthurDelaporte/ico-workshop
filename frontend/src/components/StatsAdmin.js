import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaGamepad, FaUserAlt, FaClock, FaChartLine, FaTimesCircle } from 'react-icons/fa';

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
        <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-6">Tableau de bord des statistiques</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaGamepad className="mr-2 text-indigo-500" />
                        Total des parties
                    </h2>
                    <p className="text-3xl font-bold text-indigo-700">{totalGames}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaTimesCircle className="mr-2 text-red-500" />
                        Parties abandonnées
                    </h2>
                    <p className="text-3xl font-bold text-red-700">{abandonedGames}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaClock className="mr-2 text-green-500" />
                        Temps moyen d'une partie
                    </h2>
                    <p className="text-3xl font-bold text-green-700">{averageGameTime} minutes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaClock className="mr-2 text-yellow-500" />
                        Temps médian d'une partie
                    </h2>
                    <p className="text-3xl font-bold text-yellow-700">{medianGameTime} minutes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaUserAlt className="mr-2 text-purple-500" />
                        Nombre total d'utilisateurs
                    </h2>
                    <p className="text-3xl font-bold text-purple-700">{totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold">Répartition des parties par type</h2>
                    <Pie data={gameTypesData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold flex items-center">
                        <FaChartLine className="mr-2 text-teal-500" />
                        Croissance des utilisateurs
                    </h2>
                    <Bar data={userGrowthData} />
                </div>
            </div>
        </div>
    );
};

export default StatsAdmin;
