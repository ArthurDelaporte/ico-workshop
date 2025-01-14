const supabase = require("../utils/supabaseClient");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fonction d'inscription
const signUp = async ({ email, password, firstname, lastname, birthday }) => {
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
            role: "player", // Rôle par défaut
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

    return {
        message: "Connexion réussie",
        user: data.user,
        accessToken: data.session.access_token,
    };
};

module.exports = { signUp, signIn };