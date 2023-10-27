function solve(nums) {
    let evenSum = 0;
    let oddSum = 0;

    for (const number of nums) {
        if (number % 2 === 0) {
            evenSum += number;
        } else {
            oddSum += number;
        }
    }

    console.log(evenSum - oddSum);
}