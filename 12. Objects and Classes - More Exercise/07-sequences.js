function solve(inputArray) {
    const theArrayExistsInTheCollection = (arr, collection) => {
        for (const arrayElement of collection) {
            if (JSON.stringify(arrayElement) === JSON.stringify(arr)) {
                return true;                
            }
        }
        return false;
    }

    let result = [];
    for (const jsonString of inputArray) {
        let sortedSequence = JSON.parse(jsonString).sort((a, b) => b - a);
        if (!theArrayExistsInTheCollection(sortedSequence, result)) {
            result.push(sortedSequence);
        }        
    }
    
    result.sort((a, b) => a.length - b.length);
    console.log(result.map(arr => `[${arr.join(", ")}]`).join("\n"));
}