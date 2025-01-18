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
const createCard = async ({ name, description, image, type, numero }) => {
    return await prisma.card.create({
        data: {
            name,
            description,
            type,
            numero,
            image
        },
    });
};

// Mettre à jour une carte par ID
const updateCard = async (id, { name, description, image, type, numero }) => {
    return await prisma.card.update({
        where: { id },
        data: {
            name,
            description,
            type,
            numero,
            image
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