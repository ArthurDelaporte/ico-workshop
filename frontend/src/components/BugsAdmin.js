import React, { useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaEdit, FaTrashAlt, FaBug, FaLightbulb, FaCommentAlt } from 'react-icons/fa';

const BugsAdmin = () => {
    const [bugs, setBugs] = useState([
        { 
            id: 1, 
            title: 'Bug dans le formulaire de connexion', 
            description: 'Le bouton de soumission ne fonctionne pas.', 
            status: 'Ouvert', 
            comments: [], 
            player: { name: 'John Doe', email: 'john.doe@example.com' } 
        },
        { 
            id: 2, 
            title: 'Suggestion d\'amélioration de l\'UI', 
            description: 'Ajouter des animations sur les boutons.', 
            status: 'En cours', 
            comments: [], 
            player: { name: 'Jane Smith', email: 'jane.smith@example.com' } 
        },
        { 
            id: 3, 
            title: 'Erreur de chargement de la page de profil', 
            description: 'La page de profil ne charge pas les données utilisateur.', 
            status: 'Résolu', 
            comments: [], 
            player: { name: 'Alice Johnson', email: 'alice.johnson@example.com' } 
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setBugs(bugs.map(bug => (bug.id === id ? { ...bug, status: newStatus } : bug)));
    };

    const deleteBug = (id) => {
        setBugs(bugs.filter(bug => bug.id !== id));
    };

    const addComment = (id, comment) => {
        setBugs(bugs.map(bug => (bug.id === id ? { ...bug, comments: [...bug.comments, comment] } : bug)));
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
                    Gestion des Bugs et Suggestions
                </h1>
                <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-[#DED0B1]">
                            <th className="px-4 py-3 text-left text-[#00253E]">Titre</th>
                            <th className="px-4 py-3 text-left sm:block md:table-cell text-[#00253E]">Description</th>
                            <th className="px-4 py-3 text-left sm:block md:table-cell text-[#00253E]">Joueur</th>
                            <th className="px-4 py-3 text-left text-[#00253E]">Statut</th>
                            <th className="px-4 py-3 text-left text-[#00253E]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug) => (
                            <tr key={bug.id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3 flex items-center text-[#00253E]">
                                    {bug.title.toLowerCase().includes('bug') ? 
                                        <FaBug className="text-red-500 mr-4 text-xl" /> : 
                                        <FaLightbulb className="text-yellow-500 mr-4 text-xl" />
                                    }
                                    <div className="break-words">{bug.title}</div>
                                </td>
                                <td className="px-4 py-3 sm:block md:table-cell">{bug.description}</td>
                                <td className="px-4 py-3 sm:block md:table-cell">
                                    <div>
                                        <strong className="text-[#AF2127]">Nom:</strong> {bug.player.name}<br />
                                        <strong className="text-[#AF2127]">Email:</strong> {bug.player.email}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-3 py-2 rounded-full text-white ${bug.status === 'Résolu' ? 'bg-green-500' : bug.status === 'En cours' ? 'bg-yellow-500' : 'bg-red-500'} whitespace-nowrap`}>
                                        {bug.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 flex space-x-2">
                                    <button onClick={() => updateStatus(bug.id, 'En cours')} className="text-yellow-500 hover:text-yellow-700 text-xl">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => updateStatus(bug.id, 'Résolu')} className="text-green-500 hover:text-green-700 text-xl">
                                        <FaCheckCircle />
                                    </button>
                                    <button onClick={() => deleteBug(bug.id)} className="text-red-500 hover:text-red-700 text-xl">
                                        <FaTrashAlt />
                                    </button>
                                    <button onClick={() => addComment(bug.id, 'Nouveau commentaire')} className="text-blue-500 hover:text-blue-700 text-xl">
                                        <FaCommentAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BugsAdmin;
