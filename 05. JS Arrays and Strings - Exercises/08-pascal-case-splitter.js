function solve(input) {
    let pattern = new RegExp("[A-Z]([a-z]+)?", "g");    
    let result = input.match(pattern);
    console.log(result.join(", "));
}