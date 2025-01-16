import React, { useState } from 'react';

const BanModal = ({ isOpen, onClose, onConfirm }) => {
    const [banDuration, setBanDuration] = useState(1); // Durée par défaut : 1 unité
    const [timeUnit, setTimeUnit] = useState('minutes'); // Unité de temps par défaut

    if (!isOpen) return null;

    const handleConfirm = () => {
        let durationInMinutes;

        switch (timeUnit) {
            case 'heures':
                durationInMinutes = banDuration * 60;
                break;
            case 'jours':
                durationInMinutes = banDuration * 60 * 24;
                break;
            case 'semaines':
                durationInMinutes = banDuration * 60 * 24 * 7;
                break;
            case 'mois':
                durationInMinutes = banDuration * 60 * 24 * 30;
                break;
            default:
                durationInMinutes = banDuration;
        }

        onConfirm(durationInMinutes);
        setBanDuration(1);
        setTimeUnit('minutes');
    };

    return (
        <div className="fixed inset-0 bg-indigo-100 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Confirmer le bannissement</h2>
                <p className="mb-4">Spécifiez la durée du bannissement :</p>
                <div className="flex mb-4">
                    <input
                        type="number"
                        min="1"
                        value={banDuration}
                        onChange={(e) => setBanDuration(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-1/2 mr-2"
                    />
                    <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-1/2"
                    >
                        <option value="minutes">Minutes</option>
                        <option value="heures">Heures</option>
                        <option value="jours">Jours</option>
                        <option value="semaines">Semaines</option>
                        <option value="mois">Mois</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BanModal;
