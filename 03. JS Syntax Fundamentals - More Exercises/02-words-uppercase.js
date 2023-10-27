function solve(input) {
    let words = [];
    let currentWord = "";
    
    for (let i = 0; i < input.length; i++) {
        const symbol = input[i];

        if (/^[a-zA-Z0-9_]$/.test(symbol)) {
            currentWord += symbol;
        } else if (currentWord.length > 0) {
            words.push(currentWord.toUpperCase());
            currentWord = "";
        }
    }

    if (currentWord.length > 0) {
        words.push(currentWord.toUpperCase());
    }

    const result = words.join(", ");
    console.log(result);
}