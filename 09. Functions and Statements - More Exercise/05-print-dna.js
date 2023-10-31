function solve(input) {
    let pattern = ["A", "T", "C", "G", "T", "T", "A", "G", "G", "G"];
    for (let row = 1; row <= input; row++) {
        const firstSymbol = pattern.shift();
        const secondSymbol = pattern.shift();
        pattern.push(firstSymbol, secondSymbol);
        if (row % 4 === 1) {
            console.log(`**${firstSymbol + secondSymbol}**`);
        } else if (row % 2 === 0) {
            console.log(`*${firstSymbol}--${secondSymbol}*`);
        } else {
            console.log(`${firstSymbol}----${secondSymbol}`);
        }        
    }
}

solve(10);