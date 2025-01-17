const supabase = require("../utils/supabaseClient");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fonction d'inscription
const signUp = async ({ email, password, firstname, lastname, birthday, role, statusBan }) => {
    // Création de l'utilisateur dans Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new Error(`Erreur d'inscription : ${error.message}`);
    }

    // Enregistrer l'utilisateur dans la table `user` avec Prisma
    const user = await prisma.user.create({
        data: {
            id: data.user.id, // L'ID utilisateur généré par Supabase
            email,
            firstname,
            lastname,
            birthday: new Date(birthday),
            role,
            statusBan,
        },
    });

    return { message: "Inscription réussie", user };
};

// Fonction de connexion
const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(`Erreur de connexion : ${error.message}`);
    }

    const { session, user } = data;

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            role: true,
        },
    });

    if (!dbUser) {
        throw new Error(`Erreur de récupération de l'utilisateur`);
    }

    return {
        message: "Connexion réussie",
        user: { id: dbUser.id, role: dbUser.role },
        accessToken: data.session.access_token,
    };
};

module.exports = { signUp, signIn };