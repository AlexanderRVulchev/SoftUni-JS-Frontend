function solve(number) {    
    while (getAverage(number.toString()) < 5) {
        number += "9";
    }
    console.log(number);

    function getAverage(num) {
        let average = 0;
        for (let i = 0; i < num.length; i++) {
            average += Number(num[i]) / num.length;            
        }
        return average;
    }
}