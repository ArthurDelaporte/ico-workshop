import React, { useState } from 'react';

const initialCardsData = [
    { id: 1, name: 'Carte 1', front: '/path/to/front1.jpg', back: '/path/to/back1.jpg', description: 'Description de la Carte 1' },
    { id: 2, name: 'Carte 2', front: '/path/to/front2.jpg', back: '/path/to/back2.jpg', description: 'Description de la Carte 2' },
    // Ajoutez plus de cartes ici
];

const CardStore = () => {
    const [cards, setCards] = useState(initialCardsData);
    const [selectedCard, setSelectedCard] = useState(null);
    const [newCard, setNewCard] = useState({ name: '', front: '', back: '', description: '' });
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleClose = () => {
        setSelectedCard(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedCard(prevCard => ({
            ...prevCard,
            [name]: value,
        }));
    };

    const handleNewCardChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value,
        }));
    };

    const handleImageChange = (e, side, isNewCard = false) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (isNewCard) {
                setNewCard(prevCard => ({
                    ...prevCard,
                    [side]: reader.result,
                }));
            } else {
                setSelectedCard(prevCard => ({
                    ...prevCard,
                    [side]: reader.result,
                }));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveChanges = () => {
        setCards(prevCards => prevCards.map(card => 
            card.id === selectedCard.id ? selectedCard : card
        ));
        handleClose();
    };

    const handleDelete = () => {
        setCards(prevCards => prevCards.filter(card => card.id !== selectedCard.id));
        handleClose();
    };

    const handleAddNewCard = () => {
        setCards(prevCards => [
            ...prevCards,
            { ...newCard, id: Date.now() }
        ]);
        setNewCard({ name: '', front: '', back: '', description: '' });
        setIsAddFormVisible(false); // Cacher le formulaire après ajout
    };

    return (
        <div className="min-h-screen bg-blue-900 p-6">
            <h1 className="text-4xl font-bold text-white text-center mb-6">Gestion des Cartes</h1>

            {/* Bouton pour afficher/masquer le formulaire d'ajout */}
            <div className="text-center mb-6">
                <button 
                    onClick={() => setIsAddFormVisible(!isAddFormVisible)} 
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isAddFormVisible ? 'Cacher le Formulaire' : 'Ajouter une Nouvelle Carte'}
                </button>
            </div>

            {/* Formulaire d'ajout d'une nouvelle carte */}
            {isAddFormVisible && (
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-bold mb-4">Ajouter une Nouvelle Carte</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom de la Carte</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={newCard.name} 
                            onChange={handleNewCardChange} 
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Recto</label>
                        <input 
                            type="file" 
                            onChange={(e) => handleImageChange(e, 'front', true)} 
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Verso</label>
                        <input 
                            type="file" 
                            onChange={(e) => handleImageChange(e, 'back', true)} 
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea 
                            name="description" 
                            value={newCard.description} 
                            onChange={handleNewCardChange} 
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <button 
                        onClick={handleAddNewCard} 
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                        Ajouter la Carte
                    </button>
                </div>
            )}

            {/* Liste des cartes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map(card => (
                    <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative group">
                            <img src={card.front} alt={`Front of ${card.name}`} className="w-full h-48 object-cover group-hover:hidden" />
                            <img src={card.back} alt={`Back of ${card.name}`} className="w-full h-48 object-cover hidden group-hover:block" />
                        </div>
                        <div className="p-4 text-center">
                            <h2 className="text-lg font-bold">{card.name}</h2>
                            <button 
                                onClick={() => handleCardClick(card)} 
                                className="mt-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Détails
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal pour les détails de la carte */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2">Modifier la Carte</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nom de la Carte</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={selectedCard.name} 
                                    onChange={handleEditChange} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Recto</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => handleImageChange(e, 'front')} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Verso</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => handleImageChange(e, 'back')} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea 
                                    name="description" 
                                    value={selectedCard.description} 
                                    onChange={handleEditChange} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    onClick={handleClose} 
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                                >
                                    Annuler
                                </button>
                                <button 
                                    onClick={handleSaveChanges} 
                                    className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                                >
                                    Sauvegarder
                                </button>
                                <button 
                                    onClick={handleDelete} 
                                    className="ml-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardStore;
