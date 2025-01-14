require("dotenv").config();
const express = require("express");
const app = express();

// Middleware pour le parsing JSON
app.use(express.json());

// Importer les routes
const authRoutes = require("./routes/auth");

// Définir les routes API
app.use("/api/auth", authRoutes);

// Route par défaut
app.get("/", (req, res) => {
    res.send("Bienvenue dans le backend de ton jeu !");
});

module.exports = app;