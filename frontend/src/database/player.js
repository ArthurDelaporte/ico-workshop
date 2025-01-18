import {addData, getAllData, getData} from './indexedDB';
import {getCardInfo} from "./card";

export async function setPlayerName(partyId, playerName) {
    // Récupérer les joueurs de la partie
    const party = await getData('party', partyId);
    if (!party) throw new Error('Party introuvable.');

    for (const playerId of party.playersId) {
        const player = await getData('player', playerId);

        // Trouver le premier joueur sans nom
        if (player.name === null) {
            player.name = playerName;

            player.created_at = new Date();

            // Mettre à jour l'objet Player
            await addData('player', player);

            return player;
        }
    }

    throw new Error('Tous les joueurs ont déjà un nom.');
}

export async function getAllPlayersName(partyId) {
    const party = await getData('party', partyId);

    const playersName = []

    for (const playerId of party.playersId) {
        const player = await getData('player', playerId);
        playersName.push(player.name);
    }

    return playersName;
}

export async function getAllPlayers(partyId) {
    const party = await getData('party', partyId);

    const players = []

    for (const playerId of party.playersId) {
        const player = await getData('player', playerId);
        players.push(player);
    }

    return players;
}

export async function getPlayerInfo(playerId) {
    try {
        const player = await getData('player', playerId);
        if (!player) {
            console.error(`Aucun joueur trouvé avec l'ID ${playerId}`);
            return null;
        }

        player.card = await getCardInfo(player.cardId);

        return player; // Retourne l'objet joueur avec la carte
    } catch (error) {
        console.error(`Erreur lors de la récupération des infos du joueur (${playerId}):`, error);
        return null;
    }
}

export async function isPlayerNameUsed(partyId, playerName) {
    try {
        // Vérifier si partyId est bien défini
        if (!partyId) {
            console.error("Erreur: partyId est undefined ou null.");
            return false;
        }

        const party = await getData('party', partyId);

        // Vérifier si la partie existe
        if (!party) {
            console.error(`Erreur: Aucune partie trouvée avec l'ID ${partyId}.`);
            return false;
        }

        // Vérifier si playersId est défini
        if (!party.playersId || !Array.isArray(party.playersId)) {
            console.error(`Erreur: La propriété 'playersId' est absente ou invalide dans la partie avec l'ID ${partyId}.`);
            return false;
        }

        // Vérification des joueurs
        for (const playerId of party.playersId) {
            const player = await getData('player', playerId);
            if (player && player.name === playerName) {
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Erreur lors de la vérification du nom du joueur :", error);
        return false;
    }
}

export async function hasUnnamedPlayers(partyId) {
    try {
        const party = await getData('party', partyId);
        if (!party) {
            console.error(`Aucune partie trouvée avec l'ID ${partyId}`);
            return false;
        }

        // Vérification si `playersId` existe et est un tableau
        if (!party.playersId || !Array.isArray(party.playersId)) {
            console.error(`Erreur: 'playersId' est absent ou invalide pour la partie ${partyId}.`);
            return false;
        }

        // Vérifier si au moins un joueur n'a pas de nom
        for (const playerId of party.playersId) {
            const player = await getData('player', playerId);
            if (!player?.name) {
                return true; // Il reste au moins un joueur sans nom
            }
        }

        return false; // Tous les joueurs ont un nom
    } catch (error) {
        console.error(`Erreur lors de la vérification des joueurs sans nom (${partyId}):`, error);
        return false;
    }
}
