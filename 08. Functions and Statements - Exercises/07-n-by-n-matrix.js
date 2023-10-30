function solve(n) {
    for (let row = 0; row < n; row++) {
        let line = [];
        for (let col = 0; col < n; col++) {
            line.push(n);
        }
        console.log(line.join(" "));
    }
}