function sumTable() {
    let prices = document.querySelectorAll("table tr td:nth-child(2)");
    let sum = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        sum += Number(prices[i].textContent);
    }
    document.getElementById("sum").textContent = sum;
}