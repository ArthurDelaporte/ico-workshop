const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import de multer pour gérer les fichiers
const { createCard, getAllCards, getCardById, updateCard, deleteCard } = require("../services/cardService");
const { uploadImageToBucket } = require("../utils/uploadImage"); // Import de la fonction d'upload d'image

// Configurer multer pour gérer les fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Créer une nouvelle carte
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const { name, description, type, numero } = req.body;
        const image = req.file; // Récupérer l'image envoyée par le frontend

        if (!name) {
            return res.status(400).json({ error: "Le nom de la carte est requis" });
        }

        // Si une image est envoyée, uploader l'image sur Supabase
        let imageUrl = null;
        if (image) {
            const fileName = `${Date.now()}-${image.originalname}`;
            imageUrl = await uploadImageToBucket(image, fileName);
        }

        // Création de la carte avec l'URL de l'image
        const card = await createCard({
            name,
            description,
            type,
            numero,
            image: imageUrl
        });

        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une carte par ID
router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, numero } = req.body;
        const image = req.file; // Récupérer l'image envoyée par le frontend

        // Si une image est envoyée, uploader l'image sur Supabase
        let imageUrl = null;
        if (image) {
            const fileName = `${Date.now()}-${image.originalname}`;
            imageUrl = await uploadImageToBucket(image, fileName);
        }

        // Mettre à jour la carte avec l'URL de l'image
        const updatedCard = await updateCard(id, {
            name,
            description,
            type,
            numero,
            image: imageUrl
        });

        if (!updatedCard) {
            return res.status(404).json({ error: "Carte non trouvée" });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
