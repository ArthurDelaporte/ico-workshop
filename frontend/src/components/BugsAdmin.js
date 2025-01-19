//import React, { useState } from 'react';
//import { FaArrowLeft, FaCheckCircle, FaEdit, FaTrashAlt, FaBug, FaLightbulb } from 'react-icons/fa';
//
//const BugsAdmin = () => {
//    const [bugs, setBugs] = useState([
//        { 
//            id: 1, 
//            Type: 'Bug', 
//            description: 'Le bouton de soumission ne fonctionne pas.', 
//            status: 'Ouvert', 
//            comments: [], 
//            player: { email: 'john.doe@example.com' } 
//        },
//        { 
//            id: 2, 
//            Type: 'Suggestion', 
//            description: 'Ajouter des animations sur les boutons.', 
//            status: 'En cours', 
//            comments: [], 
//            player: { email: 'jane.smith@example.com' } 
//        },
//        { 
//            id: 3, 
//            Type: 'Suggestion', 
//            description: 'La page de profil ne charge pas les données utilisateur.', 
//            status: 'Résolu', 
//            comments: [], 
//            player: { email: 'alice.johnson@example.com' } 
//        },
//    ]);
//
//    const updateStatus = (id, newStatus) => {
//        setBugs(bugs.map(bug => (bug.id === id ? { ...bug, status: newStatus } : bug)));
//    };
//
//    const deleteBug = (id) => {
//        setBugs(bugs.filter(bug => bug.id !== id));
//    };
//
//    const addComment = (id, comment) => {
//        setBugs(bugs.map(bug => (bug.id === id ? { ...bug, comments: [...bug.comments, comment] } : bug)));
//    };
//
//    return (
//        <div className="min-h-screen bg-[#00253E] py-6 px-4 font-sans">
//            {/* Barre supérieure avec retour au Dashboard */}
//            <div className="w-full max-w-4xl flex items-center justify-between mb-6">
//                <button
//                    onClick={() => (window.location.href = "./dashboard")}
//                    className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
//                >
//                    <FaArrowLeft className="mr-2" />
//                </button>
//                <h1
//                    className="text-4xl font-bold text-[#DED0B1] text-center"
//                    style={{ fontFamily: "'Alatsi', sans-serif" }}
//                >
//                    Gestion des Bugs et Suggestions
//                </h1>
//                <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
//            </div>
//
//            <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
//                <table className="min-w-full table-auto text-sm">
//                    <thead>
//                        <tr className="bg-[#DED0B1]">
//                            <th className="px-4 py-3 text-left text-[#00253E]">Titre</th>
//                            <th className="px-4 py-3 text-left sm:block md:table-cell text-[#00253E]">Description</th>
//                            <th className="px-4 py-3 text-left sm:block md:table-cell text-[#00253E]">Joueur</th>
//                            <th className="px-4 py-3 text-left text-[#00253E]">Statut</th>
//                            <th className="px-4 py-3 text-left text-[#00253E]">Actions</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {bugs.map((bug) => (
//                            <tr key={bug.id} className="border-b hover:bg-gray-100">
//                                <td className="px-4 py-3 flex items-center text-[#00253E]">
//                                    {bug.Type.toLowerCase().includes('bug') ? 
//                                        <FaBug className="text-red-500 mr-4 text-xl" /> : 
//                                        <FaLightbulb className="text-yellow-500 mr-4 text-xl" />
//                                    }
//                                    <div className="break-words">{bug.Type}</div>
//                                </td>
//                                <td className="px-4 py-3 sm:block md:table-cell">{bug.description}</td>
//                                <td className="px-4 py-3 sm:block md:table-cell">
//                                    <div>
//                                        <strong className="text-[#AF2127]">Email:</strong> {bug.player.email}
//                                    </div>
//                                </td>
//                                <td className="px-4 py-3">
//                                    <span className={`px-3 py-2 rounded-full text-white ${bug.status === 'Résolu' ? 'bg-green-500' : bug.status === 'En cours' ? 'bg-yellow-500' : 'bg-red-500'} whitespace-nowrap`}>
//                                        {bug.status}
//                                    </span>
//                                </td>
//                                <td className="px-4 py-3 flex space-x-2">
//                                    <button onClick={() => updateStatus(bug.id, 'En cours')} className="text-yellow-500 hover:text-yellow-700 text-xl">
//                                        <FaEdit />
//                                    </button>
//                                    <button onClick={() => updateStatus(bug.id, 'Résolu')} className="text-green-500 hover:text-green-700 text-xl">
//                                        <FaCheckCircle />
//                                    </button>
//                                    <button onClick={() => deleteBug(bug.id)} className="text-red-500 hover:text-red-700 text-xl">
//                                        <FaTrashAlt />
//                                    </button>
//                                
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </div>
//        </div>
//    );
//};
//
//export default BugsAdmin;

//import React, { useState, useEffect } from 'react';
//import { FaArrowLeft, FaCheckCircle, FaEdit, FaTrashAlt, FaBug, FaLightbulb } from 'react-icons/fa';
//
//const BugsAdmin = () => {
//  const [bugs, setBugs] = useState([]);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState('');
//
//  const API_URL = "https://ico-workshop.onrender.com/api/bugs";
//
//  useEffect(() => {
//    const fetchBugs = async () => {
//      try {
//        const response = await fetch(API_URL);
//        if (!response.ok) throw new Error('Erreur lors du chargement des bugs.');
//        const data = await response.json();
//        setBugs(data);
//      } catch (err) {
//        setError(err.message);
//      } finally {
//        setLoading(false);
//      }
//    };
//
//    fetchBugs();
//  }, []);
//
//  const updateStatus = async (id, newStatus) => {
//    try {
//      const response = await fetch(`${API_URL}/${id}`, {
//        method: 'PUT',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ status: newStatus }),
//      });
//
//      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut.');
//      setBugs(bugs.map((bug) => (bug.id === id ? { ...bug, status: newStatus } : bug)));
//    } catch (err) {
//      setError(err.message);
//    }
//  };
//
//  const deleteBug = async (id) => {
//    try {
//      const response = await fetch(`${API_URL}/${id}`, {
//        method: 'DELETE',
//      });
//
//      if (!response.ok) throw new Error('Erreur lors de la suppression du bug.');
//      setBugs(bugs.filter((bug) => bug.id !== id));
//    } catch (err) {
//      setError(err.message);
//    }
//  };
//
//  if (loading) {
//    return (
//      <div className="flex items-center justify-center min-h-screen">
//        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
//      </div>
//    );
//  }
//
//  if (error) {
//    return (
//      <div className="text-red-500">
//        {error}
//      </div>
//    );
//  }
//
//  return (
//    <div className="min-h-screen bg-[#00253E] py-6 px-4 font-sans">
//      {/* Barre supérieure avec retour au Dashboard */}
//      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
//        <button
//          onClick={() => (window.location.href = './dashboard')}
//          className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
//        >
//          <FaArrowLeft className="mr-2" />
//        </button>
//        <h1
//          className="text-4xl font-bold text-[#DED0B1] text-center"
//          style={{ fontFamily: "'Alatsi', sans-serif" }}
//        >
//          Gestion des Bugs et Suggestions
//        </h1>
//        <div className="w-8" />
//      </div>
//
//      <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
//        {error && (
//          <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
//            {error}
//          </div>
//        )}
//        <table className="min-w-full table-auto text-sm">
//          <thead>
//            <tr className="bg-[#DED0B1]">
//              <th className="px-4 py-3 text-left text-[#00253E]">Titre</th>
//              <th className="px-4 py-3 text-left text-[#00253E]">Description</th>
//              <th className="px-4 py-3 text-left text-[#00253E]">Joueur</th>
//              <th className="px-4 py-3 text-left text-[#00253E]">Statut</th>
//              <th className="px-4 py-3 text-left text-[#00253E]">Actions</th>
//            </tr>
//          </thead>
//          <tbody>
//            {bugs.map((bug) => (
//              <tr key={bug.id} className="border-b hover:bg-gray-100">
//                <td className="px-4 py-3 flex items-center text-[#00253E]">
//                  {bug.Type.toLowerCase().includes('bug') ? (
//                    <FaBug className="text-red-500 mr-4 text-xl" />
//                  ) : (
//                    <FaLightbulb className="text-yellow-500 mr-4 text-xl" />
//                  )}
//                  <div className="break-words">{bug.Type}</div>
//                </td>
//                <td className="px-4 py-3">{bug.description}</td>
//                <td className="px-4 py-3">
//                  <div>
//                    <strong className="text-[#AF2127]">Email:</strong> {bug.player?.email || 'Non fourni'}
//                  </div>
//                </td>
//                <td className="px-4 py-3">
//                  <span
//                    className={`px-3 py-2 rounded-full text-white ${
//                      bug.status === 'Résolu'
//                        ? 'bg-green-500'
//                        : bug.status === 'En cours'
//                        ? 'bg-yellow-500'
//                        : 'bg-red-500'
//                    }`}
//                  >
//                    {bug.status}
//                  </span>
//                </td>
//                <td className="px-4 py-3 flex space-x-2">
//                  <button
//                    onClick={() => updateStatus(bug.id, 'En cours')}
//                    className="text-yellow-500 hover:text-yellow-700 text-xl"
//                  >
//                    <FaEdit />
//                  </button>
//                  <button
//                    onClick={() => updateStatus(bug.id, 'Résolu')}
//                    className="text-green-500 hover:text-green-700 text-xl"
//                  >
//                    <FaCheckCircle />
//                  </button>
//                  <button
//                    onClick={() => deleteBug(bug.id)}
//                    className="text-red-500 hover:text-red-700 text-xl"
//                  >
//                    <FaTrashAlt />
//                  </button>
//                </td>
//              </tr>
//            ))}
//          </tbody>
//        </table>
//      </div>
//    </div>
//  );
//};
//
//export default BugsAdmin;
//

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCheckCircle, FaEdit, FaTrashAlt, FaBug, FaLightbulb } from 'react-icons/fa';

const BugsAdmin = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://ico-workshop.onrender.com/api/bugs';

  const fetchBugs = async () => {
    setLoading(true); // Réinitialise l'état de chargement
    setError(''); // Réinitialise l'erreur
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erreur lors du chargement des bugs.');
      const data = await response.json();
      setBugs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut.');
      setBugs(bugs.map((bug) => (bug.id === id ? { ...bug, status: newStatus } : bug)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBug = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression du bug.');
      setBugs(bugs.filter((bug) => bug.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#00253E] py-6 px-4 font-sans">
      {/* Barre supérieure avec retour au Dashboard */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={() => (window.location.href = './dashboard')}
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
        <div className="w-8" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
        {/* Afficher un message d'erreur si présent */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={fetchBugs}
              className="text-sm bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Loader si les données chargent */}
        {loading && (
          <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}

        {/* Afficher les bugs si disponibles */}
        {!loading && !error && bugs.length > 0 && (
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-[#DED0B1]">
                <th className="px-4 py-3 text-left text-[#00253E]">Titre</th>
                <th className="px-4 py-3 text-left text-[#00253E]">Description</th>
                <th className="px-4 py-3 text-left text-[#00253E]">Joueur</th>
                <th className="px-4 py-3 text-left text-[#00253E]">Statut</th>
                <th className="px-4 py-3 text-left text-[#00253E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3 flex items-center text-[#00253E]">
                    {bug.type.toLowerCase().includes('bug') ? (
                      <FaBug className="text-red-500 mr-4 text-xl" />
                    ) : (
                      <FaLightbulb className="text-yellow-500 mr-4 text-xl" />
                    )}
                    <div className="break-words">{bug.type}</div>
                  </td>
                  <td className="px-4 py-3">{bug.description}</td>
                  <td className="px-4 py-3">
                    <div>
                      <strong className="text-[#AF2127]">Email:</strong> {bug.player || 'Non fourni'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-2 rounded-full text-white ${
                        bug.status === 'Résolu'
                          ? 'bg-green-500'
                          : bug.status === 'En cours'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {bug.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => updateStatus(bug.id, false)}
                      className="text-yellow-500 hover:text-yellow-700 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => updateStatus(bug.id, true)}
                      className="text-green-500 hover:text-green-700 text-xl"
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => deleteBug(bug.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Message si aucun bug n'est disponible */}
        {!loading && bugs.length === 0 && !error && (
          <div className="text-center text-gray-500">Aucun bug ou suggestion trouvé.</div>
        )}
      </div>
    </div>
  );
};

export default BugsAdmin;
