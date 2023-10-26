function solve(number) {
    let digitToCompare = number % 10;
    let allDigitsAreTheSame = true;
    let sumOfAllDigits = 0;

    while (number > 0) {
        let remainder = number % 10;

        if (remainder !== digitToCompare) {
            allDigitsAreTheSame = false;
        }

        sumOfAllDigits += remainder;
        number -= remainder;
        number /= 10;
    }

    console.log(allDigitsAreTheSame);
    console.log(sumOfAllDigits);
}