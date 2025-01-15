async function createAventure(partyId, captainId, team1Players, team2Players) {
    const aventureId = crypto.randomUUID();
    const aventure = {
        id: aventureId,
        captain: captainId,
        team1: team1Players.map((playerId) => ({ playerId, choice: null })),
        team1_status: null,
        team2: team2Players.map((playerId) => ({ playerId, choice: null })),
        team2_status: null
    };

    // Ajouter l'aventure dans le store
    await addData('aventure', aventure);

    // Mettre à jour la liste des aventures dans l'objet Party
    const party = await getData('party', partyId);
    party.aventures.push(aventureId);
    await addData('party', party);

    return aventure;
}

async function finalizeAventure(partyId, aventureId) {
    const aventure = await getData('aventure', aventureId);
    const party = await getData('party', partyId);

    const team1Choices = aventure.team1.map((member) => member.choice);
    const team2Choices = aventure.team2.map((member) => member.choice);

    const totalChoices = [...team1Choices, ...team2Choices];
    const poisonCount = totalChoices.filter((choice) => choice === 'poison').length;

    if (poisonCount === 0) {
        party.score_marins += 1;
    } else {
        party.score_pirates += 1;
    }

    // Mettre à jour l'état du Party et de l'aventure
    aventure.team1_status = poisonCount === 0 ? 'valid' : 'reject';
    aventure.team2_status = poisonCount === 0 ? 'valid' : 'reject';

    await addData('aventure', aventure);
    await addData('party', party);

    return { party, aventure };
}
