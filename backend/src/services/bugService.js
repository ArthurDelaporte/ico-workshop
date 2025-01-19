const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Créer un nouveau bug ou suggestion.
 * @param {Object} data - Les données du bug/suggestion.
 * @param {string} data.type - Le type (bug ou suggestion).
 * @param {string} data.description - La description du problème.
 * @param {string} [data.player] - L'email du joueur (facultatif).
 * @returns {Promise<Object>} Le bug créé.
 */
const createBug = async ({ type, description, player, status }) => {
    return await prisma.bug.create({
        data: {
            type,
            description,
            player,
            status
        },
    });
};

/**
 * Récupérer tous les bugs et suggestions.
 * @returns {Promise<Array>} Une liste de bugs/suggestions.
 */
const getAllBugs = async () => {
    return await prisma.bug.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

/**
 * Mettre à jour le statut d'un bug/suggestion.
 * @param {string} id - L'ID du bug.
 * @param {boolean} status - Le nouveau statut.
 * @returns {Promise<Object>} Le bug mis à jour.
 */
const updateBugStatus = async (id, status) => {
    return await prisma.bug.update({
        where: { id },
        data: { status },
    });
};

/**
 * Supprimer un bug ou une suggestion.
 * @param {string} id - L'ID du bug.
 * @returns {Promise<Object>} Le bug supprimé.
 */
const deleteBug = async (id) => {
    return await prisma.bug.delete({
        where: { id },
    });
};

module.exports = {
    createBug,
    getAllBugs,
    updateBugStatus,
    deleteBug,
};
