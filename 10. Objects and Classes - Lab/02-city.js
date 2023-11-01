function solve(obj) {
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
        console.log(`${key} -> ${value}`);
    }
}