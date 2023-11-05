function solve(input) {
    let catalog = {};

    for (const el of input) {
        let [name, price] = el.split(" : ");
        const letter = name[0];
        if (!catalog.hasOwnProperty(name[0])) {
            catalog[letter] = {};         
        }
        catalog[letter][name] = price;
    }

    for (const [letter, item] of Object.entries(catalog).sort()) {
        console.log(letter);
        let sortedEntries = Object.entries(item).sort((a, b) => a[0].localeCompare(b[0]));
        for (const [name, price] of sortedEntries) {
            console.log(`  ${name}: ${price}`);
        }        
    }
}