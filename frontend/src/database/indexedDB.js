// indexedDB.js
export const dbName = 'gameDatabase';
export const dbVersion = 1;

/**
 * Initialise la base IndexedDB
 */
export async function initDatabase() {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, dbVersion);

        openRequest.onupgradeneeded = async (event) => {
            const db = event.target.result;

            // Crée les ObjectStores
            if (!db.objectStoreNames.contains('card')) {
                db.createObjectStore('card', { keyPath: 'id' });

                const description = {
                    'MARIN': "Leur but est de bien choisir leur équipage afin d’arriver sur l’île sans se faire empoisonner. Ils n’ont pas le choix et ne peuvent poser que des cartes “ÎLE”.\n\nIls doivent démasquer les pirates et identifier leurs alliés.",
                    'PIRATE': "Leur but est d’empoisonner les marins sans se faire repérer, pour noyer les soupçons, ils ont le choix entre une carte « ÎLE », ou une carte « POISON ». Ils connaissent leurs complices.",
                    'SIRENE': "La Sirène est une carte rôle à plusieurs options, elle ouvre les yeux en même temps que les pirates mais eux ne savent qui est la sirène. Elle ne peut mettre que des cartes “ÎLE”.\n\nATTENTION : Elle n’a pas le droit de déclarer son rôle, si elle est trop explicite les joueurs peuvent mettre fin à la partie Si les marins gagnent, elle gagne avec eux. Si les pirates gagnent, ils doivent voter afin d’identifier la sirène, si la majorité se trompent la sirène gagne la partie seule.",
                    'ILE': "Permet d’arriver à destination. \nS’il y a trois îles, la manche est gagnée pour les marins et la sirène.",
                    'POISON': "L’équipage est empoisonné par les pirates. \n\nS’il y a au moins un poison, la manche est gagnée pour les pirates. \n\nAttention : S’il y a plusieurs poisons, un seul point est marqué et les pirates seront repérés plus facilement."
                }

                // Initialiser les données immuables dans 'card'
                const initialCards = [
                    { id: 1, name: 'Marin', description: description["MARIN"], type: "role", numero: 1, img: "marin1" },
                    { id: 2, name: 'Marin', description: description["MARIN"], type: "role", numero: 2, img: "marin2" },
                    { id: 3, name: 'Sirène', description: description["SIRENE"], type: "role", numero: 1, img: "sirene" },
                    { id: 4, name: 'Pirate', description: description["PIRATE"], type: "role", numero: 1, img: "pirate1" },
                    { id: 5, name: 'Pirate', description: description["PIRATE"], type: "role", numero: 2, img: "pirate2" },
                    { id: 6, name: 'Île', description: description["ILE"], type: "action", numero: 1, img: "ile" },
                    { id: 7, name: 'Poison', description: description["POISON"], type: "action", numero: 1, img: "poison" },
                ];

                // Ajouter les données dans le store 'card'
                initialCards.forEach(async (card) => {
                    try {
                        await addData('card', card);
                    } catch (error) {
                        console.error('Erreur lors de l\'initialisation des données "card" :', error);
                    }
                });
            }

            if (!db.objectStoreNames.contains('party')) {
                db.createObjectStore('party', { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains('player')) {
                db.createObjectStore('player', { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains('aventure')) {
                db.createObjectStore('aventure', { keyPath: 'id' });
            }
        };

        openRequest.onsuccess = (event) => resolve(event.target.result);
        openRequest.onerror = (event) => reject(event.target.error);
    });
}

/**
 * Ajoute des données dans un ObjectStore
 */
export async function addData(storeName, data) {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.put(data);

        transaction.oncomplete = () => resolve('Données ajoutées avec succès');
        transaction.onerror = (event) => reject('Erreur lors de l\'ajout des données : ' + event.target.error);
    });
}

/**
 * Récupère des données par clé
 */
export async function getData(storeName, key) {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject('Erreur lors du chargement des données : ' + event.target.error);
    });
}

/**
 * Récupère toutes les données d'un ObjectStore
 */
export async function getAllData(storeName) {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject('Erreur lors du chargement de toutes les données : ' + event.target.error);
    });
}

/**
 * Supprime des données par clé
 */
export async function deleteData(storeName, key) {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.delete(key);

        transaction.oncomplete = () => resolve('Données supprimées avec succès');
        request.onerror = (event) => reject('Erreur lors de la suppression des données : ' + event.target.error);
    });
}
