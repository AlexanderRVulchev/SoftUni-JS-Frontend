function solve(input) {
    let [firstElement, ...wordsToCompare] = input;
    let wordsToLookFor = firstElement.split(" ");
    let dictionary = {};

    wordsToLookFor.forEach(targetWord => {
        dictionary[targetWord] = 0;
        for (const word of wordsToCompare) {
            if (targetWord === word) {
                dictionary[targetWord] += 1;
            }
        }
    });

    let entries = Object.entries(dictionary).sort((a, b) => b[1] - a[1]);

    for (const [key, value] of entries) {
        console.log(`${key} - ${value}`);
    }
}