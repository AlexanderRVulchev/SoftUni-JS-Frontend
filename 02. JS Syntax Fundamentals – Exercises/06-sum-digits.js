function solve(number) {
    let sum = 0;

    while (number > 0) {
        let remainder = number % 10;
        sum += remainder;
        number -= remainder;
        number /= 10;
    }

    console.log(sum);
}