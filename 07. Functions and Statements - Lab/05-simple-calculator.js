function solve(num1, num2, operator) {
    const operations = {
        'multiply': (num1, num2) => num1 * num2,
        'divide': (num1, num2) => num1 / num2,
        'add': (num1, num2) => num1 + num2,
        'subtract': (num1, num2) => num1 - num2
    };

    const operation = operations[operator];
    return operation(num1, num2);
}