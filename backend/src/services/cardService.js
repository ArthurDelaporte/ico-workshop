const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer toutes les cartes
const getAllCards = async () => {
    return await prisma.card.findMany();
};

// Récupérer une carte par ID
const getCardById = async (id) => {
    return await prisma.card.findUnique({
        where: { id },
    });
};

// Créer une nouvelle carte
const createCard = async ({ name, description, img, type, numero }) => {
    return await prisma.card.create({
        data: {
            name,
            description,
            img,
            type,
            numero
        },
    });
};

// Mettre à jour une carte par ID
const updateCard = async (id, { name, description, img, type, numero }) => {
    return await prisma.card.update({
        where: { id },
        data: {
            name,
            description,
            img,
            type,
            numero
        },
    });
};

// Supprimer une carte par ID
const deleteCard = async (id) => {
    return await prisma.card.delete({
        where: { id },
    });
};

module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard,
};