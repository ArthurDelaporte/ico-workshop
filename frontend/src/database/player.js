import { addData, getData} from './indexedDB';

export async function setPlayerName(partyId, playerName) {
    // Récupérer les joueurs de la partie
    const party = await getData('party', partyId);
    if (!party) throw new Error('Party introuvable.');

    const allPlayersName = await getAllPlayersName(partyId);

    if (playerName in allPlayersName) {
        throw new Error('Player name already exists');
    }

    for (const playerId of party.playersId) {
        const player = await getData('player', playerId);

        // Trouver le premier joueur sans nom
        if (player.name === null) {
            player.name = playerName;

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

    const playersName = []

    for (const playerId of party.playersId) {
        const player = await getData('player', playerId);
        playersName.push(player);
    }

    return playersName;
}
