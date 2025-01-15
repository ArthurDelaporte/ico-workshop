import { addData, getData } from './indexedDB.js';

/**
 * Sauvegarde les données de la partie
 */
export function saveGameProgress(partyData) {
    addData('party', partyData).then(() => {
        console.log('Progression sauvegardée');
    }).catch(console.error);
}

/**
 * Charge les données d'une partie
 */
export function loadGameProgress(partyId) {
    getData('party', partyId).then((partyData) => {
        if (partyData) {
            console.log('Partie chargée :', partyData);
            startGameWith(partyData); // Fonction qui démarre le jeu
        } else {
            console.log('Aucune partie sauvegardée trouvée.');
        }
    }).catch(console.error);
}

// /**
//  * Synchronisation hors-ligne/ligne
//  */
// export async function syncWithServer() {
//     const localParties = await getAllData('party');
//
//     localParties.forEach((party) => {
//         fetch('/api/sync', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(party),
//         }).then((response) => {
//             if (response.ok) {
//                 console.log('Partie synchronisée :', party.id);
//             }
//         }).catch(console.error);
//     });
// }