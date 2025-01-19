import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const RulesAdmin = () => {
  const API_URL = "https://ico-workshop.onrender.com/api/rules";
  const [rules, setRules] = useState([]);
  const [editableRuleId, setEditableRuleId] = useState(null);
  const [tempRuleText, setTempRuleText] = useState("");
  const [newRuleText, setNewRuleText] = useState("");

  // Charger les règles au montage du composant
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get(API_URL);
      setRules(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des règles :", error);
    }
  };

  const addRule = async () => {
    if (newRuleText.trim()) {
      try {
        const response = await axios.post(API_URL, { description: newRuleText.trim() });
        fetchRules(); // Rafraîchir la liste des règles après ajout
        setNewRuleText(""); // Réinitialiser le champ
      } catch (error) {
        console.error("Erreur lors de l'ajout d'une règle :", error);
      }
    }
  };

  const startEditing = (id, text) => {
    setEditableRuleId(id);
    setTempRuleText(text);
  };

  const saveRule = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { description: tempRuleText });
      setRules(rules.map((rule) => (rule.id === id ? response.data : rule)));
      setEditableRuleId(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la règle :", error);
    }
  };

  const deleteRule = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRules(rules.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la règle :", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#00253E] flex flex-col items-center py-6 px-4"
      style={{ fontFamily: "'Alata', sans-serif" }}
    >
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
          Gestion des Règles
        </h1>
        <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
      </div>

      {/* Liste des règles */}
      <ul className="w-full max-w-2xl bg-white shadow-lg rounded-lg divide-y divide-gray-200 mb-6">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className="flex justify-between items-center px-4 py-3 hover:bg-[#DED0B1]"
          >
            {editableRuleId === rule.id ? (
              <textarea
                value={tempRuleText}
                onChange={(e) => setTempRuleText(e.target.value)}
                className="flex-grow bg-[#DED0B1] text-gray-800 px-2 py-1 rounded border border-[#CE5960] focus:outline-none resize-none"
                rows="5" // Améliorer l'affichage des longues phrases
              />
            ) : (
              <span className="text-gray-800 text-lg">{rule.description}</span>
            )}
            <div className="flex items-center gap-2">
              {editableRuleId === rule.id ? (
                <button
                  onClick={() => saveRule(rule.id)}
                  className="bg-[#AF2127] text-white px-3 py-1 rounded hover:bg-[#CE5960]"
                >
                  Enregistrer
                </button>
              ) : (
                <button
                  onClick={() => startEditing(rule.id, rule.description)}
                  className="bg-[#CE5960] text-white px-3 py-1 rounded hover:bg-[#AF2127] flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Modifier
                </button>
              )}
              <button
                onClick={() => deleteRule(rule.id)}
                className="bg-[#AF2127] text-white px-3 py-1 rounded hover:bg-[#CE5960] flex items-center"
              >
                <FaTrashAlt className="mr-1" />
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Ajouter une nouvelle règle */}
      <div className="w-full max-w-2xl flex items-center gap-4">
        <input
          type="text"
          value={newRuleText}
          onChange={(e) => setNewRuleText(e.target.value)}
          className="flex-grow bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-[#DED0B1]"
          placeholder="Nouvelle règle"
        />
        <button
          onClick={addRule}
          className="bg-[#DED0B1] text-gray-900 px-4 py-2 rounded hover:bg-[#CE5960] flex items-center"
        >
          <FaPlus className="mr-2" /> Ajouter
        </button>
      </div>
    </div>
  );
};

export default RulesAdmin;
