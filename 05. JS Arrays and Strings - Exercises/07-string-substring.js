function solve(word, text) {
    let allWords = text.toLowerCase().split(" ");
    let output = `${word} not found!`;     

    for (let i = 0; i < allWords.length; i++) {
        if (allWords[i].toLowerCase() === word) {
            output = word;
        }        
    }

    console.log(output);    
}