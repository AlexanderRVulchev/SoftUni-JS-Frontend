function solve(start, end) {
    let numbersString = "";
    let sum = 0;

    for (let i = start; i <= end; i++) {
        sum += i;
        numbersString += `${i} `;
    }

    console.log(numbersString);
    console.log(`Sum: ${sum}`);
}