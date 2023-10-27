function solve(yield) {
    let days = 0;
    let spice = 0;
    
    while (yield >= 100) {
        spice += yield - 26;
        yield -= 10;
        days += 1;
    }
    spice = spice < 26 ? 0 : spice - 26;

    console.log(days);
    console.log(spice);
}