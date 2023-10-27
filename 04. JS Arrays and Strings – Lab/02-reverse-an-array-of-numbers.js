function solve(n, elements) {
    let nums = elements.splice(0, n).reverse();
    console.log(nums.join(" "));
}