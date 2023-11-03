function solve(inputArray) {
    let heroes = [];
    for (let i = 0; i < inputArray.length; i++) {
        let [name, level, items] = inputArray[i].split(" / ");
        const hero = {
            name: name,
            level: Number(level),
            items: items
        }
        heroes.push(hero);            
    };
    
    heroes.sort((a, b) => a.level - b.level);
    
    for (const hero of heroes) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    }
}