function solve(num1, num2) {
    const calculateFactorial = (x) => x === 1 ? 1 : x * calculateFactorial(x - 1);
    console.log((calculateFactorial(num1) / calculateFactorial(num2)).toFixed(2));
}