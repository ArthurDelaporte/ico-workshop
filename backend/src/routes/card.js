const express = require("express");
const router = express.Router();
const {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
} = require("../services/cardService");

// Récupérer toutes les cartes
router.get("/", async (req, res) => {
    try {
        const cards = await getAllCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une carte par ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getCardById(id);
        if (!card) {
            return res.status(404).json({ error: "Carte non trouvée" });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle carte
router.post("/", async (req, res) => {
    try {
        const { name, description, img, type, numero } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Le nom de la carte est requis" });
        }
        const card = await createCard({ name, description, img, type, numero });
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une carte par ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, img, type, numero } = req.body;
        const updatedCard = await updateCard(id, { name, description, img, type, numero });
        if (!updatedCard) {
            return res.status(404).json({ error: "Carte non trouvée" });
        }
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une carte par ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCard = await deleteCard(id);
        if (!deletedCard) {
            return res.status(404).json({ error: "Carte non trouvée" });
        }
        res.status(200).json({ message: "Carte supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;