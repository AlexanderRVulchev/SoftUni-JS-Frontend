function solve(coordinates) {
    checkDistance(coordinates[0], coordinates[1], 0, 0);
    checkDistance(coordinates[2], coordinates[3], 0, 0);
    checkDistance(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);

    function checkDistance(x1, y1, x2, y2) {
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let status = "invalid";
        if (Number.isInteger(distance)) {
            status = "valid";
        }
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`);
    }
}

solve([2, 1, 1, 1]);