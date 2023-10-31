function solve(commands) {
    let cleanliness = 0;
    const actions = {
        "soap": (x) => x + 10,
        "water": (x) => x * 1.2,
        "vacuum cleaner": (x) => x * 1.25,
        "mud": (x) => x * 0.9
    };
    for (let i = 0; i < commands.length; i++) {
        cleanliness = actions[commands[i]](cleanliness);
    }
    console.log(`The car is ${cleanliness.toFixed(2)}% clean.`);
}