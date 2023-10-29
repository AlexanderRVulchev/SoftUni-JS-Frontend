function solve(num1, num2, num3) {
    const determineSign = (num, sign) => num > 0 ? sign : !sign;
    const result = determineSign(num3, determineSign(num2, determineSign(num1, true)));
    console.log(result ? "Positive" : "Negative");
}