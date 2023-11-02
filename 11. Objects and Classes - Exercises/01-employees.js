function solve(inputArray) {
    let people = [];
    for (const name of inputArray) {
        people.push({
            name: name,
            personalNumber: name.length
        })
    }
    people.forEach(p => console.log(`Name: ${p.name} -- Personal Number: ${p.personalNumber}`));
}