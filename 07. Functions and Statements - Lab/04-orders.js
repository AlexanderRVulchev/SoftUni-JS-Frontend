function solve(type, quantity) {
    let pricesForDrinks = {
        "coffee": 1.50,
        "water": 1.00,
        "coke": 1.40,
        "snacks": 2.00
    }
    console.log((pricesForDrinks[type] * quantity).toFixed(2));
}