function solve(inputArray) {
    let garages = {};
    for (const carInfo of inputArray) {
        let [garageNumber, ...restOfTheTokens] = carInfo.split(" - ");
        if (!garages.hasOwnProperty(garageNumber)) {
            garages[garageNumber] = [];
        }

        let car = {};
        for (const kvp of restOfTheTokens.join().split(", ")) {
            let [key, value] = kvp.split(": ");
            car[key] = value;            
        }

        garages[garageNumber].push(car);
    }

    let sortedGarageNumbers = Object.keys(garages).sort();
    for (const number of sortedGarageNumbers) {
        let garageEntryArray = garages[number];
        console.log(`Garage № ${number}`); 
        garageEntryArray.forEach(car => {
            let kvPairsToDisplay = [];
            for (const [key, value] of Object.entries(car)) {
                kvPairsToDisplay.push(`${key} - ${value}`);
            }
            console.log("--- " + kvPairsToDisplay.join(", "));
        });
    }
}