//import React, { useState } from 'react';
//import { FaArrowLeft } from 'react-icons/fa'; 
//
//const initialCardsData = [
//    { id: 1, name: 'Carte 1', front: '/path/to/front1.jpg', back: '/path/to/back1.jpg', description: 'Description de la Carte 1' },
//    { id: 2, name: 'Carte 2', front: '/path/to/front2.jpg', back: '/path/to/back2.jpg', description: 'Description de la Carte 2' },
//    // Ajoutez plus de cartes ici
//];
//
//const CardStore = () => {
//    const [cards, setCards] = useState(initialCardsData);
//    const [selectedCard, setSelectedCard] = useState(null);
//    const [newCard, setNewCard] = useState({ name: '', front: '', back: '', description: '' });
//    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
//
//    const handleCardClick = (card) => {
//        setSelectedCard(card);
//    };
//
//    const handleClose = () => {
//        setSelectedCard(null);
//    };
//
//    const handleEditChange = (e) => {
//        const { name, value } = e.target;
//        setSelectedCard(prevCard => ({
//            ...prevCard,
//            [name]: value,
//        }));
//    };
//
//    const handleNewCardChange = (e) => {
//        const { name, value } = e.target;
//        setNewCard(prevCard => ({
//            ...prevCard,
//            [name]: value,
//        }));
//    };
//
//    const handleImageChange = (e, side, isNewCard = false) => {
//        const file = e.target.files[0];
//        if (!file || !file.type.startsWith("image/")) {
//            alert("Veuillez sélectionner un fichier image valide.");
//            return;
//        }
//        const reader = new FileReader();
//        reader.onloadend = () => {
//            if (isNewCard) {
//                setNewCard(prevCard => ({
//                    ...prevCard,
//                    [side]: reader.result,
//                }));
//            } else {
//                setSelectedCard(prevCard => ({
//                    ...prevCard,
//                    [side]: reader.result,
//                }));
//            }
//        };
//        reader.readAsDataURL(file);
//    };
//
//    const handleSaveChanges = () => {
//        if (!selectedCard.name || !selectedCard.front || !selectedCard.back || !selectedCard.description) {
//            alert("Tous les champs doivent être remplis.");
//            return;
//        }
//        setCards(prevCards => prevCards.map(card => 
//            card.id === selectedCard.id ? selectedCard : card
//        ));
//        handleClose();
//    };
//
//    const handleDelete = () => {
//        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
//            setCards(prevCards => prevCards.filter(card => card.id !== selectedCard.id));
//            handleClose();
//        }
//    };
//
//    const handleAddNewCard = () => {
//        if (!newCard.name || !newCard.front || !newCard.back || !newCard.description) {
//            alert("Tous les champs doivent être remplis.");
//            return;
//        }
//        setCards(prevCards => [
//            ...prevCards,
//            { ...newCard, id: Date.now() }
//        ]);
//        setNewCard({ name: '', front: '', back: '', description: '' });
//        setIsAddFormVisible(false); // Cacher le formulaire après ajout
//    };
//
//    return (
//        <div className="min-h-screen bg-[#00253E] p-6 font-sans">
//            {/* Barre supérieure avec retour au Dashboard */}
//                  <div className="w-full max-w-4xl flex items-center justify-between mb-6">
//                    <button
//                      onClick={() => (window.location.href = "./dashboard")}
//                      className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
//                    >
//                      <FaArrowLeft className="mr-2" />
//                    </button>
//                    <h1
//                      className="text-4xl font-bold text-[#DED0B1] text-center"
//                      style={{ fontFamily: "'Alatsi', sans-serif" }}
//                    >
//                      Gestion des Cartes
//                    </h1>
//                    <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
//                  </div>
//
//            {/* Bouton pour afficher/masquer le formulaire d'ajout */}
//            <div className="text-center mb-6">
//                <button 
//                    onClick={() => setIsAddFormVisible(!isAddFormVisible)} 
//                    className="bg-[#DED0B1] text-gray-900 px-4 py-2 rounded hover:bg-[#CE5960]"
//                >
//                    {isAddFormVisible ? 'Cacher le Formulaire' : 'Ajouter une Nouvelle Carte'}
//                </button>
//            </div>
//
//            {/* Formulaire d'ajout d'une nouvelle carte */}
//            {isAddFormVisible && (
//                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
//                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Alata, sans-serif' }}>Ajouter une Nouvelle Carte</h2>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Nom de la Carte</label>
//                        <input 
//                            type="text" 
//                            name="name" 
//                            value={newCard.name} 
//                            onChange={handleNewCardChange} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Recto</label>
//                        <input 
//                            type="file" 
//                            onChange={(e) => handleImageChange(e, 'front', true)} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Verso</label>
//                        <input 
//                            type="file" 
//                            onChange={(e) => handleImageChange(e, 'back', true)} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Description</label>
//                        <textarea 
//                            name="description" 
//                            value={newCard.description} 
//                            onChange={handleNewCardChange} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <button 
//                        onClick={handleAddNewCard} 
//                        className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
//                    >
//                        Ajouter la Carte
//                    </button>
//                </div>
//            )}
//
//            {/* Liste des cartes */}
//            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                {cards.map(card => (
//                    <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                        <div className="relative group">
//                            <img src={card.front} alt={`Front of ${card.name}`} className="w-full h-48 object-cover group-hover:hidden" />
//                            <img src={card.back} alt={`Back of ${card.name}`} className="w-full h-48 object-cover hidden group-hover:block" />
//                        </div>
//                        <div className="p-4 text-center">
//                            <h2 className="text-lg font-bold">{card.name}</h2>
//                            <button 
//                                onClick={() => handleCardClick(card)} 
//                                className="mt-2 bg-[#CE5960] text-white px-4 py-2 rounded hover:bg-[#AF2127]"
//                            >
//                                Détails
//                            </button>
//                        </div>
//                    </div>
//                ))}
//            </div>
//
//            {/* Modal pour les détails de la carte */}
//            {selectedCard && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                    <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg overflow-hidden">
//                        <div className="p-4">
//                            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Alata, sans-serif' }}>Modifier la Carte</h2>
//                            <div className="mb-4">
//                                <label className="block text-gray-700">Nom de la Carte</label>
//                                <input 
//                                    type="text" 
//                                    name="name" 
//                                    value={selectedCard.name} 
//                                    onChange={handleEditChange} 
//                                    className="w-full mt-1 p-2 border rounded"
//                                />
//                            </div>
//                            <div className="mb-4">
//                                <label className="block text-gray-700">Recto</label>
//                                <input 
//                                    type="file" 
//                                    onChange={(e) => handleImageChange(e, 'front')} 
//                                    className="w-full mt-1 p-2 border rounded"
//                                />
//                            </div>
//                            <div className="mb-4">
//                                <label className="block text-gray-700">Verso</label>
//                                <input 
//                                    type="file" 
//                                    onChange={(e) => handleImageChange(e, 'back')} 
//                                    className="w-full mt-1 p-2 border rounded"
//                                />
//                            </div>
//                            <div className="mb-4">
//                                <label className="block text-gray-700">Description</label>
//                                <textarea 
//                                    name="description" 
//                                    value={selectedCard.description} 
//                                    onChange={handleEditChange} 
//                                    className="w-full mt-1 p-2 border rounded"
//                                />
//                            </div>
//                            <div className="flex justify-end">
//                                <button 
//                                    onClick={handleClose} 
//                                    className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
//                                >
//                                    Annuler
//                                </button>
//                                <button 
//                                    onClick={handleSaveChanges} 
//                                    className="ml-2 bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
//                                >
//                                    Sauvegarder
//                                </button>
//                                <button 
//                                    onClick={handleDelete} 
//                                    className="ml-2 bg-[#CE5960] text-white px-4 py-2 rounded hover:bg-[#AF2127]"
//                                >
//                                    Supprimer
//                                </button>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            )}
//        </div>
//    );
//};
//
//export default CardStore;


//import React, { useState, useEffect } from 'react';
//import { FaArrowLeft } from 'react-icons/fa';
//import axios from 'axios';
//
//const CardStore = () => {
//    const API_URL = "http://localhost:1234/api/cards"; 
//    const [cards, setCards] = useState([]);
//    const [selectedCard, setSelectedCard] = useState(null);
//    const [newCard, setNewCard] = useState({ name: '', front: '', back: '', description: '' });
//    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
//
//    // Charger les cartes depuis l'API
//    useEffect(() => {
//        const fetchCards = async () => {
//            try {
//                const response = await axios.get(API_URL);
//                setCards(response.data);
//            } catch (error) {
//                console.error("Erreur lors du chargement des cartes", error);
//            }
//        };
//
//        fetchCards();
//    }, []);
//
//    // Gérer le clic sur une carte pour afficher ses détails
//    const handleCardClick = (card) => {
//        setSelectedCard(card);
//    };
//
//    // Gérer la fermeture de la modale de la carte sélectionnée
//    const handleClose = () => {
//        setSelectedCard(null);
//    };
//
//    // Gérer les changements dans le formulaire de modification d'une carte
//    const handleEditChange = (e) => {
//        const { name, value } = e.target;
//        setSelectedCard(prevCard => ({
//            ...prevCard,
//            [name]: value,
//        }));
//    };
//
//    // Gérer les changements dans le formulaire de nouvelle carte
//    const handleNewCardChange = (e) => {
//        const { name, value } = e.target;
//        setNewCard(prevCard => ({
//            ...prevCard,
//            [name]: value,
//        }));
//    };
//
//    // Gérer l'ajout d'une nouvelle carte
//    const handleAddNewCard = async () => {
//        if (!newCard.name || !newCard.front || !newCard.back || !newCard.description) {
//            alert("Tous les champs doivent être remplis.");
//            return;
//        }
//
//        try {
//            const response = await axios.post(API_URL, newCard);
//            setCards(prevCards => [...prevCards, response.data]);
//            setNewCard({ name: '', front: '', back: '', description: '' });
//            setIsAddFormVisible(false);
//        } catch (error) {
//            console.error("Erreur lors de l'ajout de la carte", error);
//        }
//    };
//
//    // Gérer la suppression d'une carte
//    const handleDelete = async () => {
//        if (!selectedCard) return;
//        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
//            try {
//                await axios.delete(`${API_URL}/${selectedCard.id}`);
//                setCards(prevCards => prevCards.filter(card => card.id !== selectedCard.id));
//                handleClose();
//            } catch (error) {
//                console.error("Erreur lors de la suppression de la carte", error);
//            }
//        }
//    };
//
//    // Gérer la sauvegarde des changements sur une carte
//    const handleSaveChanges = async () => {
//        if (!selectedCard.name || !selectedCard.front || !selectedCard.back || !selectedCard.description) {
//            alert("Tous les champs doivent être remplis.");
//            return;
//        }
//
//        try {
//            const response = await axios.put(`${API_URL}/${selectedCard.id}`, selectedCard);
//            setCards(prevCards => prevCards.map(card => 
//                card.id === selectedCard.id ? response.data : card
//            ));
//            handleClose();
//        } catch (error) {
//            console.error("Erreur lors de la mise à jour de la carte", error);
//        }
//    };
//
//    // Fonction pour gérer le changement d'image
//    const handleImageChange = (e, side, isNewCard) => {
//        const file = e.target.files[0];
//        if (!file) return;
//
//        const reader = new FileReader();
//        reader.onloadend = () => {
//            if (isNewCard) {
//                setNewCard(prevCard => ({
//                    ...prevCard,
//                    [side]: reader.result, // Utilise 'front' ou 'back' comme clé
//                }));
//            } else {
//                setSelectedCard(prevCard => ({
//                    ...prevCard,
//                    [side]: reader.result, // Utilise 'front' ou 'back' comme clé
//                }));
//            }
//        };
//        reader.readAsDataURL(file); // Lire le fichier comme une URL base64
//    };
//
//    return (
//        <div className="min-h-screen bg-[#00253E] p-6 font-sans">
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
//                    Gestion des Cartes
//                </h1>
//                <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
//            </div>
//
//            {/* Bouton pour afficher/masquer le formulaire d'ajout */}
//            <div className="text-center mb-6">
//                <button 
//                    onClick={() => setIsAddFormVisible(!isAddFormVisible)} 
//                    className="bg-[#DED0B1] text-gray-900 px-4 py-2 rounded hover:bg-[#CE5960]"
//                >
//                    {isAddFormVisible ? 'Cacher le Formulaire' : 'Ajouter une Nouvelle Carte'}
//                </button>
//            </div>
//
//            {/* Formulaire d'ajout d'une nouvelle carte */}
//            {isAddFormVisible && (
//                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
//                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Alata, sans-serif' }}>Ajouter une Nouvelle Carte</h2>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Nom de la Carte</label>
//                        <input 
//                            type="text" 
//                            name="name" 
//                            value={newCard.name} 
//                            onChange={handleNewCardChange} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Recto</label>
//                        <input 
//                            type="file" 
//                            onChange={(e) => handleImageChange(e, 'front', true)} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Verso</label>
//                        <input 
//                            type="file" 
//                            onChange={(e) => handleImageChange(e, 'back', true)} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <div className="mb-4">
//                        <label className="block text-gray-700">Description</label>
//                        <textarea 
//                            name="description" 
//                            value={newCard.description} 
//                            onChange={handleNewCardChange} 
//                            className="w-full mt-1 p-2 border rounded"
//                        />
//                    </div>
//                    <button 
//                        onClick={handleAddNewCard} 
//                        className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
//                    >
//                        Ajouter la Carte
//                    </button>
//                </div>
//            )}
//
//            {/* Liste des cartes */}
//            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                {cards.map(card => (
//                    <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                        <div className="relative group">
//                            <img src={card.front} alt={`Front of ${card.name}`} className="w-full h-48 object-cover group-hover:hidden" />
//                            <img src={card.back} alt={`Back of ${card.name}`} className="w-full h-48 object-cover hidden group-hover:block" />
//                        </div>
//                        <div className="p-4 text-center">
//                            <h2 className="text-lg font-bold">{card.name}</h2>
//                            <button 
//                                onClick={() => handleCardClick(card)} 
//                                className="mt-2 bg-[#CE5960] text-white px-4 py-2 rounded hover:bg-[#AF2127]"
//                            >
//                                Détails
//                            </button>
//                        </div>
//                    </div>
//                ))}
//            </div>
//
//            {/* Modal pour les détails de la carte */}
//            {selectedCard && (
//                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//                        <button 
//                            onClick={handleClose} 
//                            className="absolute top-2 right-2 text-2xl text-gray-500"
//                        >
//                            ×
//                        </button>
//                        <h2 className="text-2xl font-bold mb-4">{selectedCard.name}</h2>
//                        <img src={selectedCard.front} alt="Front" className="w-full h-48 object-cover mb-4" />
//                        <img src={selectedCard.back} alt="Back" className="w-full h-48 object-cover mb-4" />
//                        <p className="mb-4">{selectedCard.description}</p>
//                        <div className="flex justify-between">
//                            <button 
//                                onClick={handleDelete} 
//                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                            >
//                                Supprimer
//                            </button>
//                            <button 
//                                onClick={handleSaveChanges} 
//                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                            >
//                                Sauvegarder
//                            </button>
//                        </div>
//                    </div>
//                </div>
//            )}
//        </div>
//    );
//};
//
//export default CardStore;

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const CardStore = () => {
    const API_URL = "http://localhost:1234/api/cards";
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [newCard, setNewCard] = useState({
        name: '',
        description: '',
        type: '',
        numero: '',
        image: ''
    });
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Erreur réseau');
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error("Erreur lors du chargement des cartes", error);
            }
        };
        fetchCards();
    }, []);

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

    const handleImageChange = (e, isNewCard = false) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (isNewCard) {
                setNewCard(prevCard => ({
                    ...prevCard,
                    image: reader.result
                }));
            } else {
                setSelectedCard(prevCard => ({
                    ...prevCard,
                    image: reader.result
                }));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddNewCard = async () => {
        if (!newCard.name || !newCard.type || !newCard.numero) {
            alert("Les champs nom, type et numéro sont obligatoires.");
            return;
        }

        try {
            const cardData = {
                ...newCard,
                numero: parseInt(newCard.numero)
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData)
            });
            if (!response.ok) throw new Error('Erreur réseau');
            const data = await response.json();
            setCards(prevCards => [...prevCards, data]);
            setNewCard({ name: '', description: '', type: '', numero: '', image: '' });
            setIsAddFormVisible(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la carte", error);
        }
    };

    const handleSaveChanges = async () => {
        if (!selectedCard.name || !selectedCard.type || !selectedCard.numero) {
            alert("Les champs nom, type et numéro sont obligatoires.");
            return;
        }

        try {
            const cardData = {
                ...selectedCard,
                numero: parseInt(selectedCard.numero)
            };
            const response = await fetch(`${API_URL}/${selectedCard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData)
            });
            if (!response.ok) throw new Error('Erreur réseau');
            const data = await response.json();
            setCards(prevCards => prevCards.map(card => 
                card.id === selectedCard.id ? data : card
            ));
            handleClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la carte", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
            try {
                const response = await fetch(`${API_URL}/${selectedCard.id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Erreur réseau');
                setCards(prevCards => prevCards.filter(card => card.id !== selectedCard.id));
                handleClose();
            } catch (error) {
                console.error("Erreur lors de la suppression de la carte", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#00253E] p-6 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => (window.location.href = "./dashboard")}
                        className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
                    >
                        <ArrowLeft className="mr-2" />
                    </button>
                    <h1 className="text-4xl font-bold text-[#DED0B1] text-center">
                        Gestion des Cartes
                    </h1>
                    <div className="w-8" />
                </div>

                <div className="text-center mb-6">
                    <button 
                        onClick={() => setIsAddFormVisible(!isAddFormVisible)}
                        className="bg-[#DED0B1] text-gray-900 px-4 py-2 rounded hover:bg-[#CE5960]"
                    >
                        {isAddFormVisible ? 'Cacher le Formulaire' : 'Ajouter une Nouvelle Carte'}
                    </button>
                </div>

                {isAddFormVisible && (
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                        <h2 className="text-2xl font-bold mb-4">Ajouter une Nouvelle Carte</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-700">Nom de la Carte</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={newCard.name} 
                                    onChange={handleNewCardChange} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Type</label>
                                <input 
                                    type="text" 
                                    name="type" 
                                    value={newCard.type} 
                                    onChange={handleNewCardChange} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Numéro</label>
                                <input 
                                    type="number" 
                                    name="numero" 
                                    value={newCard.numero} 
                                    onChange={handleNewCardChange} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Image</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => handleImageChange(e, true)} 
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </div>
                            <div>
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
                                className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
                            >
                                Ajouter la Carte
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cards.map(card => (
                        <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="relative">
                                <img 
                                    src={card.image || '/api/placeholder/400/320'} 
                                    alt={card.name} 
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{card.name}</h2>
                                <p className="text-sm text-gray-600">Type: {card.type}</p>
                                <p className="text-sm text-gray-600">N°: {card.numero}</p>
                                <button 
                                    onClick={() => handleCardClick(card)} 
                                    className="mt-2 bg-[#CE5960] text-white px-4 py-2 rounded hover:bg-[#AF2127] w-full"
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCard && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Modifier la Carte</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-700">Nom de la Carte</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={selectedCard.name} 
                                        onChange={handleEditChange} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Type</label>
                                    <input 
                                        type="text" 
                                        name="type" 
                                        value={selectedCard.type} 
                                        onChange={handleEditChange} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Numéro</label>
                                    <input 
                                        type="number" 
                                        name="numero" 
                                        value={selectedCard.numero} 
                                        onChange={handleEditChange} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Image</label>
                                    <input 
                                        type="file" 
                                        onChange={(e) => handleImageChange(e)} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={selectedCard.description || ''} 
                                        onChange={handleEditChange} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={handleClose} 
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        onClick={handleSaveChanges} 
                                        className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960]"
                                    >
                                        Sauvegarder
                                    </button>
                                    <button 
                                        onClick={handleDelete} 
                                        className="bg-[#CE5960] text-white px-4 py-2 rounded hover:bg-[#AF2127]"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardStore;