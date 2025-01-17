const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Récupérer toutes les règles
const getAllRules = async () => {
    return await prisma.rule.findMany();
};

// Récupérer une règle par ID
const getRuleById = async (id) => {
    return await prisma.rule.findUnique({
        where: { id },
    });
};

// Créer une nouvelle règle
const createRule = async ({ description }) => {
    return await prisma.rule.create({
        data: {
            description,
        },
    });
};

// Mettre à jour une règle par ID
const updateRule = async (id, { description }) => {
    return await prisma.rule.update({
        where: { id },
        data: {
            description,
        },
    });
};

// Supprimer une règle par ID
const deleteRule = async (id) => {
    return await prisma.rule.delete({
        where: { id },
    });
};

module.exports = {
    getAllRules,
    getRuleById,
    createRule,
    updateRule,
    deleteRule,
};
