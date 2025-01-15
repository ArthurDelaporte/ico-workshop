import { getAllData, addData } from './indexedDB';

async function setPlayerName(partyId, playerName) {
    // Récupérer les joueurs de la partie
    const party = await getData('party', partyId);
    if (!party) throw new Error('Party introuvable.');

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
