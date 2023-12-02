function solve(input) {
    let horses = input.shift().split("|");

    while (input.length > 0) {
        const line = input.shift();
        if (line === "Finish") {
            break;
        }

        [command, ...restOfTheTokens] = line.split(" ");

        if (command === "Retake") {
            retake(restOfTheTokens);
        } else if (command === "Trouble") {
            trouble(restOfTheTokens);
        } else if (command === "Rage") {
            rage(restOfTheTokens);
        } else if (command === "Miracle") {
            miracle();
        }
    }

    console.log(horses.join("->"));
    console.log("The winner is: " + horses.pop());

    function retake(tokens) {
        const [overtakingHorseName, overtakenHorseName] = tokens;
        let overtakenIndex = horses.indexOf(overtakenHorseName);
        let overtakingIndex = horses.indexOf(overtakingHorseName);

        if (overtakenIndex > overtakingIndex && overtakingIndex >= 0) {
            swapHorseIndexes(overtakenIndex, overtakingIndex)
            console.log(`${overtakingHorseName} retakes ${overtakenHorseName}.`);
        }
    }

    function trouble(tokens) {
        const horseName = tokens[0];
        const horseIndex = horses.indexOf(horseName);

        if (horseIndex > 0) {
            swapHorseIndexes(horseIndex, horseIndex - 1);
            console.log(`Trouble for ${horseName} - drops one position.`);
        }
    }

    function rage(tokens) {
        const horseName = tokens[0];

        for (let i = 0; i < 2; i++) {
            const horseIndex = horses.indexOf(horseName);
            if (horseIndex < horses.length - 1) {
                swapHorseIndexes(horseIndex, horseIndex + 1);
            }
        }

        console.log(`${horseName} rages 2 positions ahead.`);
    }

    function miracle() {
        horses.push(horses.shift());
        console.log(`What a miracle - ${horses[horses.length - 1]} becomes first.`);
    }

    function swapHorseIndexes(first, second) {
        const temp = horses[first];
        horses[first] = horses[second];
        horses[second] = temp;
    }
}