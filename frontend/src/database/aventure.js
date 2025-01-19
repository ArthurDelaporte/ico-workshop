import { getData, addData } from "./indexedDB";

export async function createAventure(partyId) {
    const party = await getData('party', partyId);
    const aventureId = crypto.randomUUID();
    const aventure = {
        id: aventureId,
        captain: party.actual_captain,
        team: [],
        team1_status: null,
        team2_status: null
    };

    // Ajouter l'aventure dans le store
    await addData('aventure', aventure);

    // Mettre à jour la liste des aventures dans l'objet Party
    party.aventures.push(aventureId);
    await addData('party', party);

    return aventure;
}

export async function getLastAventureInfo(partyId) {
    const party = await getData('party', partyId);
    const aventureId = party.aventures[party.aventures.length - 1];
    try {
        const aventure = await getData('aventure', aventureId);
        if (!aventure) {
            console.error(`Aucune partie trouvée avec l'ID ${aventureId}`);
            return null;
        }
        return aventure;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la partie (${aventureId}):`, error);
        return null;
    }
}

export async function getLastAventureChoices(partyId) {
    try {
        if (!partyId) {
            throw new Error("Paramètre manquant : partyId est requis.");
        }

        const aventure = await getLastAventureInfo(partyId);
        if (!aventure || !aventure.team) {
            console.warn("Aucune aventure trouvée ou l'équipe est vide.");
            return [];
        }

        return aventure.team.map(member => member.choice);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des choix :", error);
        return [];
    }
}

export async function getAventureInfo(aventureId) {
    try {
        const aventure = await getData('aventure', aventureId);
        if (!aventure) {
            console.error(`Aucune partie trouvée avec l'ID ${aventureId}`);
            return null;
        }
        return aventure;
    } catch (error) {
        console.error(`Erreur lors de la récupération de la partie (${aventureId}):`, error);
        return null;
    }
}

export async function addTeamAventure(aventureId, teamPlayersId) {
    const aventure = await getData('aventure', aventureId);

    aventure.team = teamPlayersId.map((playerId) => ({ playerId: playerId, choice: null }));

    await addData('aventure', aventure);

    return aventure;
}

export async function teamAventureReject(aventureId) {
    const aventure = await getData('aventure', aventureId);

    if (aventure.team1_status === null) {
        aventure.team1_status = 'reject';
    } else {
        aventure.team2_status = 'reject';
    }

    await addData('aventure', aventure);

    return aventure;
}

export async function updateAventureChoice(partyId, selectedCard, teamIndex) {
    try {
        if (!partyId || !selectedCard) {
            throw new Error("Paramètres manquants : partyId et selectedCard sont requis.");
        }

        const party = await getData('party', partyId);
        const aventure = await getLastAventureInfo(partyId);

        if (!aventure || !aventure.team) {
            throw new Error("Aucune aventure valide trouvée pour cette partie.");
        }

        aventure.team[teamIndex].choice = selectedCard;

        if (teamIndex === 2) {
            const teamChoices = aventure.team.map((member) => member.choice);
            const poisonCount = teamChoices.filter((choice) => choice === 'poison').length;

            if (poisonCount === 0) {
                party.score_marins += 1;
            } else {
                party.score_pirates += 1;
            }
        }

        await addData("aventure", aventure);
        await addData('party', party);

        return aventure;
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du choix :", error);
        return null;
    }
}

export async function finalizeAventure(partyId, ) {
    const party = await getData('party', partyId);

    if (party.score_marins === 10) {
        party.status = 'finished_marins';
    } else if (party.score_pirates === 10) {
        party.status = 'finished_pirates';
        console.log("Victoire des pirates")
    }

    await addData('party', party);

    return { party };
}

export async function changeCaptain(partyId) {
    const party = await getData('party', partyId);

    party.last_captains.push(party.actual_captain);

    if (party.last_captains.length === party.number_players - 1) {
        party.future_captains = party.last_captains;
        party.last_captains = [];
    }

    party.actual_captain = party.future_captains.shift();

    await addData('party', party);
}
