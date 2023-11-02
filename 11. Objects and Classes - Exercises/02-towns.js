function solve(inputArray) {
    let towns = [];
    for (const townInfo of inputArray) {
        let [town, latitude, longitude] = townInfo.split(" | ");
        towns.push({
            town: town,
            latitude: Number(latitude).toFixed(2),
            longitude: Number(longitude).toFixed(2)
        });
    }
    towns.forEach(t => console.log(`{ town: '${t.town}', latitude: '${t.latitude}', longitude: '${t.longitude}' }`));
}