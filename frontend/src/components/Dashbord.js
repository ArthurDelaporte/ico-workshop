import React from 'react';
import { Link } from 'react-router-dom';
import { FaAnchor, FaChartBar, FaMapMarkedAlt, FaSkullCrossbones, FaUsers, FaBug } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div
            className="min-h-screen bg-[#00253E] flex flex-col items-center py-6 px-4"
            style={{ fontFamily: "'Alata', sans-serif" }}
        >
            {/* Titre du Dashboard */}
            <h1
                className="text-5xl font-bold text-[#DED0B1] mb-10 text-center"
                style={{ fontFamily: "'Alatsi', sans-serif" }}
            >
                <FaSkullCrossbones className="inline-block mr-3" /> Tableau de Bord Admin
            </h1>

            {/* Liste des options */}
            <ul className="w-full max-w-lg bg-white shadow-2xl rounded-lg divide-y divide-gray-300">
                {/* Gestion des règles */}
                <li className="hover:bg-[#DED0B1] flex items-center">
                    <FaSkullCrossbones className="text-[#CE5960] text-2xl ml-4 mr-4" />
                    <Link
                        to="/rules-admin"
                        className="block flex-1 px-4 py-3 text-gray-800 text-lg font-semibold hover:text-[#AF2127]"
                    >
                        Gestion des règles du jeu
                    </Link>
                </li>
                {/* Gestion des cartes */}
                <li className="hover:bg-[#DED0B1] flex items-center">
                    <FaMapMarkedAlt className="text-[#CE5960] text-2xl ml-4 mr-4" />
                    <Link
                        to="/cards-admin"
                        className="block flex-1 px-4 py-3 text-gray-800 text-lg font-semibold hover:text-[#AF2127]"
                    >
                        Gestion des cartes
                    </Link>
                </li>
                {/* Gestion des utilisateurs */}
                <li className="hover:bg-[#DED0B1] flex items-center">
                    <FaUsers className="text-[#CE5960] text-2xl ml-4 mr-4" />
                    <Link
                        to="/users-admin"
                        className="block flex-1 px-4 py-3 text-gray-800 text-lg font-semibold hover:text-[#AF2127]"
                    >
                        Gestion des utilisateurs
                    </Link>
                </li>
                {/* Statistiques */}
                <li className="hover:bg-[#DED0B1] flex items-center">
                    <FaChartBar className="text-[#CE5960] text-2xl ml-4 mr-4" />
                    <Link
                        to="/stats-admin"
                        className="block flex-1 px-4 py-3 text-gray-800 text-lg font-semibold hover:text-[#AF2127]"
                    >
                        Statistiques
                    </Link>
                </li>
                {/* Gestion des bugs/suggestions */}
                <li className="hover:bg-[#DED0B1] flex items-center">
                    <FaBug className="text-[#CE5960] text-2xl ml-4 mr-4" />
                    <Link
                        to="/bugs-admin"
                        className="block flex-1 px-4 py-3 text-gray-800 text-lg font-semibold hover:text-[#AF2127]"
                    >
                        Gestion des bugs/suggestions
                    </Link>
                </li>
            </ul>

            {/* Flèche de retour */}
            <div className="mt-10">
                <Link
                    to="/"
                    className="flex flex-col items-center text-[#DED0B1] hover:text-[#AF2127] transition-transform duration-1000 transform hover:translate-y-10"
                >
                    <FaAnchor className="text-5xl animate-bounce" />
                    <span className="mt-2 text-lg font-semibold">Retour à l'accueil</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
