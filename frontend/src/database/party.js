import {addData, getData} from './indexedDB';

export async function initializeParty(numberPlayers) {
    // Validation du nombre de joueurs
    if (numberPlayers < 7 || numberPlayers > 20) {
        throw new Error('Le nombre de joueurs doit être entre 7 et 20.');
    }

    // Calcul des rôles
    const roles = generateRoles(numberPlayers);

    // Création de l'objet Party
    const partyId = crypto.randomUUID();
    const party = {
        id: partyId,
        number_players: numberPlayers,
        score_marins: 0,
        score_pirates: 0,
        playersId: [],
        actual_captain: null,
        last_captains: [],
        future_captains: [],
        status: 'initial',
        aventures: []
    };

    // Création des objets Player
    const players = roles.map((role, index) => {
        const playerId = crypto.randomUUID();
        const player = {
            id: playerId,
            name: null,
            last_aventure: false,
            cardId: role.cardId // Correspond au rôle
        };

        // Ajouter chaque joueur dans IndexedDB
        addData('player', player);

        // Stocker l'ID du joueur dans l'objet Party
        party.playersId.push(playerId);
        party.future_captains.push(playerId);

        return player;
    });

    party.actual_captain = party.playersId[0];

    // Mettre à jour l'objet Party avec les IDs des joueurs
    await addData('party', party);

    return party;
}

export async function getPartyInfo(partyId) {
    try {
        const party = await getData('party', partyId);
        if (!party) {
            console.error(`Aucune partie trouvée avec l'ID ${partyId}`);
            return null;
        }
        return party;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la partie (${partyId}):`, error);
        return null;
    }
}

/**
 * Génère les rôles des joueurs de manière aléatoire.
 */
function generateRoles(numberPlayers) {
    const roles = [];
    const numberMarins = Math.floor((numberPlayers) / 2); // Pair : +1 marin, Impair : égalité marins/pirates
    const numberPirates = numberPlayers - numberMarins - 1; // Le reste est pour les pirates
    const sireneCardId = 3; // ID fixe de la sirène

    // Ajouter les marins
    for (let i = 0; i < numberMarins; i++) {
        const cardId = Math.floor(Math.random() * 2) + 1; // Random pour le Card ID des marins
        roles.push({ cardId: cardId });
    }

    // Ajouter les pirates
    for (let i = 0; i < numberPirates; i++) {
        const cardId = Math.floor(Math.random() * 2) + 4; // Random pour le Card ID des pirates
        roles.push({ cardId: cardId });
    }

    // Ajouter la sirène
    roles.push({ cardId: sireneCardId });

    // Mélanger les rôles aléatoirement
    return roles.sort(() => Math.random() - 0.5);
}
