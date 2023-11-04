function solve(inputArray) {
    let parkingLot = [];
    for (const command of inputArray) {
        let [direction, carNumber] = command.split(", ");
        if (direction === "IN" && !parkingLot.includes(carNumber)) {
            parkingLot.push(carNumber);
        } else if (direction === "OUT" && parkingLot.includes(carNumber)) {
            let index = parkingLot.findIndex(x => x === carNumber);
            parkingLot.splice(index, 1);
        }
    }

    if (parkingLot.length > 0) {
        console.log(parkingLot.sort().join("\n"));
    } else {
        console.log("Parking Lot is Empty");
    }
}