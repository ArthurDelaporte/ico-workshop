const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Récupérer la liste de tous les utilisateurs
const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                birthday: true,
                role: true,
                statusBan: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return users;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        throw error;
    }
};

// Mettre à jour le statut "statusBan" d'un utilisateur
const updateUserStatus = async (userId, statusBan) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { statusBan },
        });
        return updatedUser;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut utilisateur :', error.message);
        throw error;
    }
};

//// Regrouper les utilisateurs par mois pour la courbe de croissance
//const getUserGrowth = async () => {
//    try {
//        const users = await prisma.user.findMany({
//            select: { createdAt: true },
//        });
//
//        // Groupement des utilisateurs par mois
//        const userGrowth = users.reduce((acc, user) => {
//            const monthYear = new Date(user.createdAt).toLocaleString('fr-FR', {
//                year: 'numeric',
//                month: 'long',
//            });
//            acc[monthYear] = (acc[monthYear] || 0) + 1;
//            return acc;
//        }, {});
//
//        // Formater les données pour la courbe
//        const growthData = Object.entries(userGrowth).map(([date, count]) => ({
//            date,
//            count,
//        }));
//
//        // Trier par date
//        growthData.sort((a, b) => new Date(`01 ${a.date}`) - new Date(`01 ${b.date}`)); // Formatage pour trier correctement
//
//        return growthData;
//    } catch (error) {
//        console.error('Erreur lors de la récupération de la croissance des utilisateurs :', error.message);
//        throw error;
//    }
//};

// Regrouper les utilisateurs par jour pour la courbe de croissance
const getUserGrowth = async () => {
    try {
        const users = await getAllUsers();

        // Groupement des utilisateurs par jour
        const userGrowth = users.reduce((acc, user) => {
            const day = new Date(user.createdAt).toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});

        // Formater les données pour la courbe
        const growthData = Object.entries(userGrowth).map(([date, count]) => ({
            date,
            count,
        }));

        // Trier par date
        growthData.sort((a, b) => new Date(a.date) - new Date(b.date));

        return growthData;
    } catch (error) {
        console.error('Erreur lors de la récupération de la croissance des utilisateurs :', error.message);
        throw error;
    }
};


module.exports = { getAllUsers, updateUserStatus, getUserGrowth };
