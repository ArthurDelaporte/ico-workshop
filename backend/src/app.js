require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use(express.json());

const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/card");

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenue dans le backend de ton jeu !");
});

module.exports = app;