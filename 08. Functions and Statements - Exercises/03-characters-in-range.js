function solve(char1, char2) {
    if (char1 > char2) {
        [char1, char2] = [char2, char1];
    }
    let result = []
    for (let i = char1.charCodeAt(0) + 1; i < char2.charCodeAt(0); i++) {
        result.push(String.fromCharCode(i));
    }
    console.log(result.join(" "))
}

solve('r', "a");