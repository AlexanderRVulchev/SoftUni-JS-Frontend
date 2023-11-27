function solve(input) {
    const maxEnergy = 200;
    const maxOxygen = 100;

    const numberOfAstonauts = parseInt(input.shift());
    let astronauts = createAstronauts(numberOfAstonauts);

    while (true) {
        const command = input.shift();
        if (command === "End") {
            break;
        }

        const [action, name, amount] = command.split(" - ");

        if (action === "Explore") {
            explore(name, amount);
        } else if (action === "Refuel") {
            refuel(name, amount);
        } else if (action === "Breathe") {
            breathe(name, amount);
        }
    }

    for (const [name, info] of Object.entries(astronauts)) {
        console.log(`Astronaut: ${name}, Oxygen: ${info.oxygen}, Energy: ${info.energy}`);
    }

    
    function createAstronauts(numberOfAstonauts) {
        let astronauts = {};

        for (let i = 0; i < numberOfAstonauts; i++) {
            const line = input.shift();
            const [name, oxygen, energy] = line.split(" ");
            astronauts[name] = {
                oxygen: Number(oxygen),
                energy: Number(energy)
            };
        }

        return astronauts;
    }

    function explore(name, amount) {
        let astronaut = astronauts[name];
        if (astronaut.energy >= amount) {
            astronaut.energy -= amount;
            console.log(`${name} has successfully explored a new area and now has ${astronaut.energy} energy!`);
        } else {
            console.log(`${name} does not have enough energy to explore!`);
        }
    }

    function refuel(name, amount) {
        let astronaut = astronauts[name];
        const energyRecovered = Math.min(amount, maxEnergy - astronaut.energy);
        astronaut.energy += energyRecovered;
        console.log(`${name} refueled their energy by ${energyRecovered}!`);
    }

    function breathe(name, amount) {
        let astronaut = astronauts[name];
        const oxygenRecovered = Math.min(amount, maxOxygen - astronaut.oxygen);
        astronaut.oxygen += oxygenRecovered;
        console.log(`${name} took a breath and recovered ${oxygenRecovered} oxygen!`);
    }
}