function solve(args) {
    let operations = {
        "Cut": (x) => x / 4,
        "Lap": (x) => x * 0.8,
        "Grind": (x) => x - 20,
        "Etch": (x) => x - 2,
        "X-ray": (x) => x + 1
    };

    let targetThickness = args[0];
    for (let i = 1; i < args.length; i++) {
        let crystalThickness = args[i];
        let previousOperationName = "";
        let sameOperationsCount = 1;

        console.log(`Processing chunk ${crystalThickness} microns`)
        while (crystalThickness !== targetThickness) {
            let currentOperationName = determineBestOperation(crystalThickness, targetThickness);
            crystalThickness = operations[currentOperationName](crystalThickness);

            if (currentOperationName === previousOperationName) {
                sameOperationsCount++;
            } else if (previousOperationName !== "") {
                console.log(`${previousOperationName} x${sameOperationsCount}`);
                sameOperationsCount = 1;
                console.log(`Transporting and washing`);
                crystalThickness = Math.floor(crystalThickness);
            }

            previousOperationName = currentOperationName;
        }

        console.log(`${previousOperationName} x${sameOperationsCount}`);
        if (previousOperationName !== "X-ray") {
            console.log(`Transporting and washing`);
        }
        console.log(`Finished crystal ${targetThickness} microns`);
    }

    function determineBestOperation(thickness, target) {
        let bestDifference;
        let bestOperation = "";

        for (let key in operations) {
            let difference = operations[key](thickness) - target;
            if (difference < -1) continue;
            if (bestDifference === undefined || difference < bestDifference) {
                bestDifference = difference;
                bestOperation = Object.values(key).join("");
            }
        }
        return bestOperation;
    }
}