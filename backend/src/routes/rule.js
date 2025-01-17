const express = require("express");
const router = express.Router();
const {
    getAllRules,
    getRuleById,
    createRule,
    updateRule,
    deleteRule,
} = require("../services/ruleService");

// Récupérer toutes les règles
router.get("/", async (req, res) => {
    try {
        const rules = await getAllRules();
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une règle par ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await getRuleById(id);
        if (!rule) {
            return res.status(404).json({ error: "Règle non trouvée" });
        }
        res.status(200).json(rule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle règle
router.post("/", async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ error: "La description est requise" });
        }
        const rule = await createRule({ description });
        res.status(201).json(rule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une règle par ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ error: "La description est requise" });
        }
        const updatedRule = await updateRule(id, { description });
        if (!updatedRule) {
            return res.status(404).json({ error: "Règle non trouvée" });
        }
        res.status(200).json(updatedRule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une règle par ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRule = await deleteRule(id);
        if (!deletedRule) {
            return res.status(404).json({ error: "Règle non trouvée" });
        }
        res.status(200).json({ message: "Règle supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
