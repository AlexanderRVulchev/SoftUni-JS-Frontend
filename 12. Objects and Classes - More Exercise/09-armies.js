function solve(inputArray) {
    let battleground = {};
    for (const line of inputArray) {

        if (line.includes(" arrives")) {
            let tokens = line.split(" ");
            tokens.pop();
            let leaderName = tokens.join(" ")
            if (!battleground.hasOwnProperty(leaderName)) {
                battleground[leaderName] = {
                    totalArmyCount: 0,
                    armies: []
                };
            }

        } else if (line.includes(" defeated")) {
            let tokens = line.split(" ");
            tokens.pop();
            let leaderName = tokens.join(" ")
            if (battleground.hasOwnProperty(leaderName)) {
                delete battleground[leaderName];
            }

        } else if (line.includes(": ")) {
            let [leaderName, armyInfo] = line.split(": ");
            let [armyName, armyCount] = armyInfo.split(", ");
            if (battleground.hasOwnProperty(leaderName)) {
                let army = {
                    armyName: armyName,
                    armyCount: parseInt(armyCount)
                }
                battleground[leaderName].armies.push(army);
                battleground[leaderName].totalArmyCount += parseInt(armyCount);
            }

        } else {
            let [armyName, armyAddCount] = line.split(" + ");
            for (const leaderName of Object.keys(battleground)) {
                if (battleground[leaderName].armies.some(a => a.armyName === armyName)) {
                    let army = battleground[leaderName].armies.filter(a => a.armyName === armyName)[0];
                    army.armyCount += parseInt(armyAddCount);
                    battleground[leaderName].totalArmyCount += parseInt(armyAddCount);
                    break;
                }
            }
        }
    }

    let sortedLeaderEntries = Object.entries(battleground).sort((a, b) => b[1].totalArmyCount - a[1].totalArmyCount);
    for (const leaderName of sortedLeaderEntries.map(l => l[0])) {
        let armiesOutputString = "";
        let sortedArmies = battleground[leaderName].armies.sort((a, b) => b.armyCount - a.armyCount);
        for (const army of sortedArmies) {
            armiesOutputString += `\n>>> ${army.armyName} - ${army.armyCount}`;
        }
        console.log(`${leaderName}: ${battleground[leaderName].totalArmyCount}` + armiesOutputString);
    }
}