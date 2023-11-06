function solve(clusterArray) {
    let [initialFlights, flightChanges, targetFlightStatusAsArray] = clusterArray;
    let flights = {};

    for (const flightInfo of initialFlights) {
        let [number, ...restOfTheTokens] = flightInfo.split(" ");
        let destination = restOfTheTokens.join(" ");
        flights[number] = {
            Destination: destination,
            Status: "Ready to fly"
        };
    }

    for (const change of flightChanges) {
        let [number, ...restOfTheTokens] = change.split(" ");
        if (Object.keys(flights).includes(number)) {
            let newStatus = restOfTheTokens.join(" ");
            flights[number].Status = newStatus;
        }
    }

    let targetFlightStatus = targetFlightStatusAsArray[0];
    for (const number of Object.keys(flights)) {
        let flightEntry = flights[number];        
        if (flightEntry.Status === targetFlightStatus) {
            console.log(flightEntry);
        }
    }
}






solve(
    [['WN269 Delaware',
    'FL2269 Oregon',
     'WN498 Las Vegas',
     'WN3145 Ohio',
     'WN612 Alabama',
     'WN4010 New York',
     'WN1173 California',
     'DL2120 Texas',
     'KL5744 Illinois',
     'WN678 Pennsylvania'],
     ['DL2120 Cancelled',
     'WN612 Cancelled',
     'WN1173 Cancelled',
     'SK330 Cancelled'],
     ['Ready to fly']
 ]
 
);