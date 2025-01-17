import { getData, addData } from "./indexedDB";

export async function createAventure(partyId, teamPlayersId) {
    const party = await getData('party', partyId);
    const aventureId = crypto.randomUUID();
    const aventure = {
        id: aventureId,
        captain: party.actual_captain,
        team: teamPlayersId.map((playerId) => ({ playerId: playerId, choice: null })),
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

export async function teamAventureReject(partyId) {
    const party = await getData('party', partyId);
    const aventureId = party.aventures[party.aventures.length - 1];
    const aventure = await getData('aventure', aventureId);

    if (aventure.team1_status === null) {
        aventure.team1_status = 'reject';
    } else {
        aventure.team2_status = 'reject';
    }

    await addData('aventure', aventure);

    return aventure;
}

export async function finalizeAventure(partyId) {
    const party = await getData('party', partyId);
    const aventureId = party.aventures[party.aventures.length - 1]; 
    const aventure = await getData('aventure', aventureId);

    if (aventure.team1_status === "reject" && aventure.team2_status === "reject") {
        await changeCaptain(partyId);
        return { party, aventure };
    }

    if (aventure.team1_status === "valid" || aventure.team2_status === "valid") {
        const teamChoices = aventure.team.map((member) => member.choice);
        const poisonCount = teamChoices.filter((choice) => choice === 'poison').length;
        const islandCount = teamChoices.filter((choice) => choice === 'ile').length;
        if (poisonCount === 0 && islandCount === teamChoices.length) {
            party.score_marins += 1;
        } else if (poisonCount > 0) {
            party.score_pirates += 1;
        }
    }

    if (party.score_marins >= 10) {
        console.log("Victoire des marins et de la sirène !");
    } else if (party.score_pirates >= 10) {
        console.log("Victoire des pirates !");
    }

    await addData('aventure', aventure);
    await addData('party', party);

    return { party, aventure };
}

export async function changeCaptain(partyId) {
    const party = await getData('party', partyId);

    party.last_captains.push(party.actual_captain);

    if (party.last_captains.length === party.playersId.length) {
        party.future_captains = [...party.playersId];
        party.last_captains = [];
    }

    party.actual_captain = party.future_captains.shift();

    await addData('party', party);
}

export async function updateAventureChoice(aventureId, playerId, choice) {
    const aventure = await getData('aventure', aventureId);

    if (!aventure) {
        throw new Error('Aventure introuvable.');
    }

    const teamMember = aventure.team.find(member => member.playerId === playerId);
    if (!teamMember) {
        throw new Error('Joueur non trouvé dans l\'équipe.');
    }

    teamMember.choice = choice;

    await addData('aventure', aventure);

    return aventure;
}
