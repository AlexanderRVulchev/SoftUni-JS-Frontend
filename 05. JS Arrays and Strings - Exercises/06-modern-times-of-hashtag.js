function solve(text) {
    text.split(" ").forEach(word => {
        if (word[0] === "#" && word.match("[0-9]") === null && word.length > 1) {
            console.log(word.replace("#", ""));            
        }
    });
}