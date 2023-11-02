function solve(stock, ordered) {
    let totalProducts = [...stock, ...ordered];
    let result = {};

    for (let i = 0; i < totalProducts.length; i += 2) {
        const name = totalProducts[i];
        const quantity = Number(totalProducts[i+1]);
        if (result.hasOwnProperty(name)) {
            result[name] += quantity;
        } else {
            result[name] = quantity;
        }
    }
    
    for (const [key, value] of Object.entries(result)) {
        console.log(`${key} -> ${value}`);
    }
}