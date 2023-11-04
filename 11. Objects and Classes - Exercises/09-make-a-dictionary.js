function solve(inputArray) {
    let dictionary = {};
    for (const stringItem of inputArray) {
        let jsonObject = JSON.parse(stringItem);
        let [key, value] = Object.entries(jsonObject)[0];
        dictionary[key] = value;
    }
    for (const [term, definition] of Object.entries(dictionary).sort()) {
        console.log(`Term: ${term} => Definition: ${definition}`);                  
    }
}