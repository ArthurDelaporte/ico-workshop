import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt, FaBug, FaLightbulb, FaCommentAlt } from 'react-icons/fa';

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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">Gestion des Bugs et Suggestions</h1>
            <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-2 py-2 text-left">Titre</th>
                            <th className="px-2 py-2 text-left sm:block md:table-cell">Description</th>
                            <th className="px-2 py-2 text-left sm:block md:table-cell">Joueur</th>
                            <th className="px-2 py-2 text-left">Statut</th>
                            <th className="px-2 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug) => (
                            <tr key={bug.id} className="border-b">
                                <td className="px-2 py-2 flex items-center">
                                    {bug.title.toLowerCase().includes('bug') ? <FaBug className="text-red-500 mr-2" /> : <FaLightbulb className="text-yellow-500 mr-2" />}
                                    <div className="break-words">{bug.title}</div>
                                </td>
                                <td className="px-2 py-2 sm:block md:table-cell">{bug.description}</td>
                                <td className="px-2 py-2 sm:block md:table-cell">
                                    <div>
                                        <strong>Nom:</strong> {bug.player.name}<br />
                                        <strong>Email:</strong> {bug.player.email}
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <span className={`px-2 py-1 rounded-full text-white ${bug.status === 'Résolu' ? 'bg-green-500' : bug.status === 'En cours' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                        {bug.status}
                                    </span>
                                </td>
                                <td className="px-2 py-2 flex space-x-1">
                                    <button onClick={() => updateStatus(bug.id, 'En cours')} className="text-yellow-500 hover:text-yellow-700">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => updateStatus(bug.id, 'Résolu')} className="text-green-500 hover:text-green-700">
                                        <FaCheckCircle />
                                    </button>
                                    <button onClick={() => deleteBug(bug.id)} className="text-red-500 hover:text-red-700">
                                        <FaTrashAlt />
                                    </button>
                                    <button onClick={() => addComment(bug.id, 'Nouveau commentaire')} className="text-blue-500 hover:text-blue-700">
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
