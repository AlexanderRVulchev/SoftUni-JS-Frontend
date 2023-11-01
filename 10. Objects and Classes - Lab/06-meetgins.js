function solve(inputArray) {
    let meetings = {};
    for (let entry of inputArray) {
        let [day, name] = entry.split(" ");
        if (day in meetings) {
            console.log(`Conflict on ${day}!`);
        } else {
            meetings[day] = name;
            console.log(`Scheduled for ${day}`);
        }
    }
    for (let key in meetings) {
        console.log(`${key} -> ${meetings[key]}`);
    }
}

solve(['Friday Bob',
'Saturday Ted',
'Monday Bill',
'Monday John',
'Wednesday George']
);