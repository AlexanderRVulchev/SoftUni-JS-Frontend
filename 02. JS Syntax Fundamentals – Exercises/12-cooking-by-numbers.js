function solve(...args) {
    let result = 0;
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "chop": result /= 2; break;
            case "dice": result = Math.sqrt(result); break;
            case "spice": result += 1; break;
            case "bake": result *= 3; break;
            case "fillet": result *= 0.8; break;
            default: result = parseFloat(args[i]); continue;
        }
        console.log(result);
    }
}