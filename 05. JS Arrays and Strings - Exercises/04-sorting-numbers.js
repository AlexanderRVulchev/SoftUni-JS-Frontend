function solve(array) {
    array.sort((a, b) => a - b);
    let smallestNumberTurn = true;
    let result = [];

    while (array.length > 0) {    
        if (smallestNumberTurn)    {
            result.push(array.shift());
        } else {
            result.push(array.pop());
        }
        smallestNumberTurn = !smallestNumberTurn;
    }

    return result;
}

solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);