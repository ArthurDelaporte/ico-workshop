import { getData, addData } from "./indexedDB";
import { v4 as uuidv4 } from 'uuid';

export async function createAventure(partyId) {
    const party = await getData('party', partyId);
    const aventureId = uuidv4();
    const aventure = {
        id: aventureId,
        captain: party.actual_captain,
        team: null,
        team1_status: null,
        team2_status: null
    };

    // Ajouter l'aventure dans le store
    await addData('aventure', aventure);

    // Mettre à jour la liste des aventures dans l'objet Party
    party.aventures.push(aventureId);
    await addData('party', party);

    console.log("createAventure")
    console.log(aventure);

    return aventure;
}

export async function getLastAventureInfo(partyId) {
    const party = await getData('party', partyId);
    const aventureId = party.aventures[-1].id;
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

    console.log("addTeamAventure")
    console.log(aventure);

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

    console.log("teamAventureReject")
    console.log(aventure);

    return aventure;
}

// export async function newTeamAventure(partyId, teamPlayersId) {
//     const party = await getData('party', partyId);
//     const aventureId = party.aventures[-1].id;
//     const aventure = await getData('aventure', aventureId);
//
//     aventure.team2 = teamPlayersId.map((playerId) => ({ playerId: playerId, choice: null }));
//
//     await addData('aventure', aventure);
//
//     return aventure;
// }

export async function finalizeAventure(partyId) {
    const party = await getData('party', partyId);
    const aventureId = party.aventures[-1].id;
    const aventure = await getData('aventure', aventureId);

    if (aventure.team1_status === "reject" && aventure.team2_status === "reject") {
        await changeCaptain(partyId);

        console.log("finalizeAventure reject")
        console.log(aventure);

        return { party, aventure };
    }

    const teamChoices = aventure.team.map((member) => member.choice);
    const poisonCount = teamChoices.filter((choice) => choice === 'poison').length;

    if (poisonCount === 0) {
        party.score_marins += 1;
    } else {
        party.score_pirates += 1;
    }

    if (party.score_marins === 10) {
        console.log("Victoire des marins et de la sirène")
    } else if (party.score_pirates === 10) {
        console.log("Victoire des pirates")
    }

    await addData('aventure', aventure);
    await addData('party', party);

    console.log("finalizeAventure")
    console.log(aventure);

    return { party, aventure };
}

export async function changeCaptain(partyId) {
    const party = await getData('party', partyId);

    party.last_captains.push(party.actual_captain);

    if (party.last_captains.length === party.playersId.length) {
        party.future_captains = party.playersId;
        party.last_captains = [];
    }

    party.actual_captains = party.future_captains.shift()

    await addData('party', party);
}
