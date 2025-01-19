import React, { useState, useEffect } from 'react'; 
import { ArrowLeft } from 'lucide-react';

const CardStore = () => {
    const API_URL = "https://ico-workshop.onrender.com/api/cards";
    const SUPABASE_BUCKET_URL = "https://xbnmuwxyhwecihcevzmw.supabase.co/storage/v1/object/public/card-images";
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

    const uploadImage = async (file) => {
        if (!file) return null;
    
        try {
            // Nom unique pour chaque image (évite les conflits)
            const uniqueFileName = `${Date.now()}-${file.name}`;
    
            // Upload de l'image dans le bucket "card-images"
            const { data, error } = await API_URL.storage
                .from('card-images') // Nom du bucket
                .upload(`public/${uniqueFileName}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });
    
            if (error) {
                throw error;
            }
    
            // Génération de l'URL publique
            const imageUrl = `${SUPABASE_BUCKET_URL}${data.path}`;
            return imageUrl;
        } catch (error) {
            console.error('Erreur lors de l’upload de l’image:', error.message);
            return null;
        }
    };

    const handleImageChange = async (e, isNewCard = false) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = await uploadImage(file);  // Récupérer l'URL publique de l'image
        if (imageUrl) {
            if (isNewCard) {
                setNewCard(prevCard => ({
                    ...prevCard,
                    image: imageUrl,
                }));
            } else {
                setSelectedCard(prevCard => ({
                    ...prevCard,
                    image: imageUrl,
                }));
            }
        }
    };

    const handleAddNewCard = async () => {
        if (!newCard.name || !newCard.type || !newCard.numero) {
            alert("Les champs nom, type et numéro sont obligatoires.");
            return;
        }
    
        try {
            let imageUrl = newCard.image;
    
            // Si une image est sélectionnée, uploader l’image
            if (newCard.file) {
                imageUrl = await uploadImage(newCard.file);
            }
    
            const cardData = {
                ...newCard,
                numero: parseInt(newCard.numero),
                image: imageUrl || '', // Utiliser l'URL si disponible
            };
    
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
            });
    
            if (!response.ok) throw new Error('Erreur réseau');
            const data = await response.json();
    
            setCards((prevCards) => [...prevCards, data]);
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
                numero: parseInt(selectedCard.numero),
            };
    
            // Si aucune image n'est sélectionnée, conserver l'image existante
            if (!selectedCard.image) {
                cardData.image = selectedCard.image; // Garder l'ancienne image
            }
    
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
                        <div className="bg-white w-11/12 sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-4 sm:p-6">
                            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Modifier la Carte</h2>
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
                                        value={selectedCard.description} 
                                        onChange={handleEditChange} 
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <button 
                                        onClick={handleSaveChanges} 
                                        className="bg-[#AF2127] text-white px-4 py-2 rounded hover:bg-[#CE5960] w-full"
                                    >
                                        Sauvegarder les Modifications
                                    </button>
                                    <button 
                                        onClick={handleDelete} 
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                                    >
                                        Supprimer la Carte
                                    </button>
                                    <button 
                                        onClick={handleClose} 
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                                    >
                                        Fermer
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
