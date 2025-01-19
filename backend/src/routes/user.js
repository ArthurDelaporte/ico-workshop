const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserStatus,
    getUserGrowth,
    getUserById,
    updateUser
} = require('../services/userService');

// Route pour récupérer la liste des utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Récupérer une carte par ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "user non trouvée" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un user par ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, birthday } = req.body;

        const updatedUser = await updateUser(id, {
            firstname,
            lastname,
            birthday
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User non trouvée" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour le statut d'un utilisateur
router.patch('/:id/status', async (req, res) => {
    const userId = req.params.id;
    const { statusBan } = req.body;

    try {
        const updatedUser = await updateUserStatus(userId, statusBan);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut utilisateur :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Endpoint pour la croissance des utilisateurs
router.get('/user-growth', async (req, res) => {
    try {
        const growthData = await getUserGrowth();
        res.status(200).json(growthData);
    } catch (error) {
        console.error('Erreur lors de la récupération de la croissance des utilisateurs :', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération de la croissance des utilisateurs.' });
    }
});

module.exports = router;
