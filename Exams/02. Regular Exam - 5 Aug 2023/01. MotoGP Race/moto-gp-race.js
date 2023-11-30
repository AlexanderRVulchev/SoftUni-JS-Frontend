function solve(inputArray) {
    const maxFuelValue = 100;
    const numberOfRiders = Number(inputArray.shift());
    let riders = readAllRidersInfo();

    while (inputArray.length > 0) {
        const [command, ...restOfTheTokens] = inputArray.shift().split(" - ");

        if (command === "Finish") {
            break;
        }

        if (command === "StopForFuel") {
            fuelStop(restOfTheTokens);
        } else if (command === "Overtaking") {
            overtaking(restOfTheTokens)
        } else if (command === "EngineFail") {
            engineFail(restOfTheTokens)
        }
    }

    for (const rider of Object.values(riders)) {
        console.log(`${rider.riderName}\n  Final position: ${rider.position}`);
    }

    function readAllRidersInfo() {
        let riders = {};
        for (let i = 0; i < numberOfRiders; i++) {
            [riderName, fuelCapacity, position] = inputArray.shift().split("|");
            riders[riderName] = {
                riderName: riderName,
                fuel: Math.min(Number(fuelCapacity), maxFuelValue),
                position: Number(position)
            };
        }
        return riders;
    }

    function fuelStop(tokens) {
        [riderName, minimumFuel, changedPosition] = tokens;
        let rider = riders[riderName];
        if (rider && rider.fuel < minimumFuel) {
            rider.position = changedPosition;
            console.log(`${riderName} stopped to refuel but lost his position, now he is ${changedPosition}.`);
        } else {
            console.log(`${riderName} does not need to stop for fuel!`);
        }
    }

    function overtaking(tokens) {
        [rider1, rider2] = tokens;
        if (riders[rider1].position < riders[rider2].position) {
            const swapValue = riders[rider1].position;
            riders[rider1].position = riders[rider2].position;
            riders[rider2].position = swapValue;
            console.log(`${rider1} overtook ${rider2}!`);
        }
    }

    function engineFail(tokens) {
        [riderName, lapsLeft] = tokens;
        delete riders[riderName];
        console.log(`${riderName} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
    }
}