function solve(number) {
    const loadedBars = number / 10;
    if (loadedBars === 10) {
        console.log("100% Complete!");
        console.log("[%%%%%%%%%%]");
    } else {
        console.log(`${number}% [${"%".repeat(loadedBars)}${".".repeat(10 - loadedBars)}]`);
        console.log(`Still loading...`);
    }
}