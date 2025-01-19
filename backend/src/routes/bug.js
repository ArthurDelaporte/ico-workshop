const express = require('express');
const router = express.Router();
const bugService = require('../services/bugService');

// Route pour créer un bug/suggestion
router.post('/', async (req, res) => {
    const { type, description, player, status } = req.body;

    if (!type || !description) {
        return res.status(400).json({ error: 'Type et description sont obligatoires.' });
    }

    try {
        const newBug = await bugService.createBug({ type, description, player, status });
        res.status(201).json(newBug);
    } catch (error) {
        console.error('Erreur lors de la création du bug :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Route pour récupérer tous les bugs/suggestions
router.get('/', async (req, res) => {
    try {
        const bugs = await bugService.getAllBugs();
        res.status(200).json(bugs);
    } catch (error) {
        console.error('Erreur lors de la récupération des bugs :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Route pour mettre à jour le statut d'un bug
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined) {
        return res.status(400).json({ error: 'Le statut est obligatoire.' });
    }

    try {
        const updatedBug = await bugService.updateBugStatus(id, status);
        res.status(200).json(updatedBug);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du bug :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Route pour supprimer un bug/suggestion
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await bugService.deleteBug(id);
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression du bug :', error.message);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

module.exports = router;
