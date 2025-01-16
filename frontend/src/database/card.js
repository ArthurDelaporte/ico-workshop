import {addData, getAllData, getData} from './indexedDB';

export async function getCardInfo(cardId) {
    try {
        const card = await getData('card', cardId);
        if (!card) {
            console.error(`Aucune partie trouvée avec l'ID ${cardId}`);
            return null;
        }
        return card;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la partie (${cardId}):`, error);
        return null;
    }
}