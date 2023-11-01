function solve(jsonAsString) {
    const obj = JSON.parse(jsonAsString);
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
        console.log(`${key}: ${value}`);
    }
}