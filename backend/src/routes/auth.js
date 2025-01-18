const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../services/authService");

// Route pour l'inscription
router.post("/signup", async (req, res) => {
    try {
        const { email, password, firstname, lastname, birthday, role, statusBan } = req.body;

        if (!email || !password || !firstname || !lastname || !birthday || !role) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        const result = await signUp({ email, password, firstname, lastname, birthday, role, statusBan });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour la connexion
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis." });
        }

        const result = await signIn({ email, password });
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;