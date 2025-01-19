const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserStatus,
    getUserGrowth,
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
