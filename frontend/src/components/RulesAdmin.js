import React, { useState } from 'react';

const RulesAdmin = () => {
    const [rules, setRules] = useState([
        { id: 1, text: "Chaque joueur doit respecter le temps de parole." },
        { id: 2, text: "Le maître du jeu est le seul à pouvoir arbitrer les débats." },
        { id: 3, text: "Les cartes doivent être mélangées avant chaque partie." },
    ]);

    const addRule = () => {
        const newRuleText = prompt("Entrez la nouvelle règle:");
        if (newRuleText) {
            setRules([...rules, { id: rules.length + 1, text: newRuleText }]);
        }
    };

    const editRule = (id) => {
        const newRuleText = prompt("Modifiez la règle:", rules.find(rule => rule.id === id).text);
        if (newRuleText) {
            setRules(rules.map(rule => rule.id === id ? { ...rule, text: newRuleText } : rule));
        }
    };

    return (
        <div className="min-h-screen bg-blue-900 flex flex-col items-center py-6 px-4">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">Gestion des Règles</h1>
            <ul className="w-full max-w-md bg-yellow-100 shadow-lg rounded-lg divide-y divide-yellow-300 mb-6">
                {rules.map((rule) => (
                    <li key={rule.id} className="flex justify-between items-center px-4 py-3 hover:bg-yellow-200">
                        <span className="text-yellow-800 text-lg">{rule.text}</span>
                        <button
                            onClick={() => editRule(rule.id)}
                            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Modifier
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={addRule}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
                Ajouter une règle
            </button>
        </div>
    );
};

export default RulesAdmin;
