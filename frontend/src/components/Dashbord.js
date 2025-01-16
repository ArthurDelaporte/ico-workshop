import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-cyan-400 flex flex-col items-center py-6 px-4">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">Admin Dashboard</h1>
            <ul className="w-full max-w-md bg-yellow-100 shadow-lg rounded-lg divide-y divide-yellow-300">
                <li className="hover:bg-yellow-200 flex items-center">
                    <span className="inline-block p-3 text-yellow-700">
                        🏴‍☠️
                    </span>
                    <Link to="/rules-admin" className="block flex-1 px-4 py-3 text-yellow-800 text-lg font-semibold">
                        Gestion des règles du jeu
                    </Link>
                </li>
                <li className="hover:bg-yellow-200 flex items-center">
                    <span className="inline-block p-3 text-yellow-700">
                        🗺️
                    </span>
                    <Link to="/cards-admin" className="block flex-1 px-4 py-3 text-yellow-800 text-lg font-semibold">
                        Gestion des cartes
                    </Link>
                </li>
                <li className="hover:bg-yellow-200 flex items-center">
                    <span className="inline-block p-3 text-yellow-700">
                        ⚓
                    </span>
                    <Link to="/users-admin" className="block flex-1 px-4 py-3 text-yellow-800 text-lg font-semibold">
                        Gestion des utilisateurs
                    </Link>
                </li>
                <li className="hover:bg-yellow-200 flex items-center">
                    <span className="inline-block p-3 text-yellow-700">
                        📊
                    </span>
                    <Link to="/stats-admin" className="block flex-1 px-4 py-3 text-yellow-800 text-lg font-semibold">
                        Statistiques
                    </Link>
                </li>
                <li className="hover:bg-yellow-200 flex items-center">
                    <span className="inline-block p-3 text-yellow-700">
                        🐙
                    </span>
                    <Link to="/bugs-admin" className="block flex-1 px-4 py-3 text-yellow-800 text-lg font-semibold">
                        Gestion des bugs/suggestions
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Dashboard;
