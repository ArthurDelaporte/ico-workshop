import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";

const RulesAdmin = () => {
  const [rules, setRules] = useState([
    { id: 1, text: "Chaque joueur doit respecter le temps de parole." },
    { id: 2, text: "Le capitaine (maître du jeu) arbitre les débats." },
    { id: 3, text: "Les cartes doivent être mélangées avant chaque partie." },
  ]);
  const [editableRuleId, setEditableRuleId] = useState(null);
  const [tempRuleText, setTempRuleText] = useState("");
  const [newRuleText, setNewRuleText] = useState("");

  const startEditing = (id, text) => {
    setEditableRuleId(id);
    setTempRuleText(text);
  };

  const saveRule = (id) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, text: tempRuleText } : rule)));
    setEditableRuleId(null);
  };

  const deleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const addRule = () => {
    if (newRuleText.trim()) {
      setRules([...rules, { id: rules.length + 1, text: newRuleText.trim() }]);
      setNewRuleText(""); // Réinitialiser le champ
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
          className="text-4xl font-bold text-[#F5E0A4] text-center"
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
            className="flex justify-between items-center px-4 py-3 hover:bg-[#F5E0A4]"
          >
            {editableRuleId === rule.id ? (
              <textarea
                value={tempRuleText}
                onChange={(e) => setTempRuleText(e.target.value)}
                className="flex-grow bg-[#F5E0A4] text-gray-800 px-2 py-1 rounded border border-[#CE5960] focus:outline-none resize-none"
                rows="4"
              />
            ) : (
              <span className="text-gray-800 text-lg">{rule.text}</span>
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
                  onClick={() => startEditing(rule.id, rule.text)}
                  className="bg-[#CE5960] text-white px-3 py-1 rounded hover:bg-[#AF2127] flex items-center"
                >
                  <FaEdit className="mr-1" /> Modifier
                </button>
              )}
              <button
                onClick={() => deleteRule(rule.id)}
                className="bg-[#AF2127] text-white px-3 py-1 rounded hover:bg-[#CE5960] flex items-center"
              >
                <FaTrashAlt className="mr-1" /> Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Ajout d'une nouvelle règle */}
      <div className="w-full max-w-2xl flex items-center gap-4">
        <input
          type="text"
          placeholder="Nouvelle règle"
          value={newRuleText}
          onChange={(e) => setNewRuleText(e.target.value)}
          className="flex-grow bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-[#F5E0A4]"
        />
        <button
          onClick={addRule}
          className="bg-[#F5E0A4] text-gray-900 px-4 py-2 rounded hover:bg-[#CE5960] flex items-center"
        >
          <FaPlus className="mr-2" /> Ajouter
        </button>
      </div>
    </div>
  );
};

export default RulesAdmin;
